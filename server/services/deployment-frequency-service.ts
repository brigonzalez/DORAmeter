import { differenceInHours, parseJSON, format, getDate } from "date-fns";

import { getAllApps, getAppByAppName } from "./app-service";
import { getLastEventByAppIdAndEventTypeId } from "./event-service";
import { getEventTypeByEventType } from "./event-type-service";
import { getMetricGoalByMetric } from "./metric-service";
import { logInfo } from "../helpers/logger-helpers";
import type { DeploymentFrequency } from "../../types/deployment-frequency.types";
import type { ApiError } from "../../types/api-error.types";

const mapRating = (rating: string | null) => {
  switch (rating) {
    case "elite":
      return "ELITE";
    case "high":
      return "HIGH";
    case "low":
      return "LOW";
    case "medium":
      return "MEDIUM";
    default:
      return "NONE";
  }
};

const getLastDeploymentDateForApp = async (app_id: string) => {
  const { id } = await getEventTypeByEventType("DEPLOYMENT");
  const eventResult = (await getLastEventByAppIdAndEventTypeId(app_id, id)) as {
    event: {
      createdTimestamp: string | number;
    };
  };

  if (!eventResult.event) {
    eventResult.event = {
      createdTimestamp: getDate(new Date(1969, 12, 28)),
    };
  }

  const stringUTCLastDeploymentDate = parseJSON(
    eventResult.event.createdTimestamp
  );
  const localLastDeploymentDate = format(
    stringUTCLastDeploymentDate,
    "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
  );

  return parseJSON(localLastDeploymentDate);
};

const getCorrespondingMetricGoal = (
  metricGoals: { [x: string]: string },
  differenceBWCurrentTimeAndLastDeploymentDate: number
) => {
  let correspondingMetricGoal = "";

  Object.keys(metricGoals).forEach((metricGoal) => {
    const numericMetricGoal = Number.parseInt(metricGoals[metricGoal]);

    if (numericMetricGoal >= differenceBWCurrentTimeAndLastDeploymentDate) {
      correspondingMetricGoal =
        !correspondingMetricGoal ||
        numericMetricGoal <
          Number.parseInt(metricGoals[correspondingMetricGoal])
          ? metricGoal
          : correspondingMetricGoal;
    }
  });

  return correspondingMetricGoal;
};

const getDeploymentFrequencyRating = async (
  lastDeploymentDate: Date
): Promise<DeploymentFrequency["rating"]> => {
  const metricGoals = await getMetricGoalByMetric("DEPLOYMENT_FREQUENCY");
  const differenceBWCurrentTimeAndLastDeploymentDate = differenceInHours(
    new Date(),
    lastDeploymentDate
  );
  const correspondingMetricGoal = getCorrespondingMetricGoal(
    metricGoals,
    differenceBWCurrentTimeAndLastDeploymentDate
  );

  return mapRating(correspondingMetricGoal);
};

const getDeploymentFrequencyByAppName = async (
  appName: string
): Promise<
  Partial<{ deploymentFrequency: DeploymentFrequency; error: ApiError }>
> => {
  logInfo(`Getting deployment frequency by app name ${appName}`);
  const { app } = await getAppByAppName(appName);

  if (!app) {
    return {
      error: {
        details: "App not found",
        type: "NotFound",
      },
    };
  }

  const lastDeploymentDate = await getLastDeploymentDateForApp(app.id);
  const rating = await getDeploymentFrequencyRating(lastDeploymentDate);

  return {
    deploymentFrequency: {
      appName,
      lastDeploymentTimestamp: lastDeploymentDate.toISOString(),
      rating,
    },
  };
};

const getDeploymentFrequencies = async (): Promise<DeploymentFrequency[]> => {
  logInfo("Getting deployment frequencies");
  const apps = await getAllApps();
  const deploymentFrequencies = [];

  for (let i = 0; i < apps.length; i++) {
    const app = apps[i];
    const lastDeploymentDate = await getLastDeploymentDateForApp(app.id);
    const rating = await getDeploymentFrequencyRating(lastDeploymentDate);

    deploymentFrequencies.push({
      appName: app.name,
      lastDeploymentTimestamp: lastDeploymentDate.toISOString(),
      rating,
    });
  }

  return deploymentFrequencies;
};

export type { DeploymentFrequency };

export { getDeploymentFrequencyByAppName, getDeploymentFrequencies };
