import {
  insertApp,
  selectAllApps,
  selectAppByAppName,
} from "../repositories/app-repository";
import type { App } from "../../types/app.types";
import type { ApiError } from "../../types/api-error.types";
import { logInfo } from "../helpers/logger-helpers";

type AppEntity = Omit<App, "id"> & {
  app_id: string;
};

interface GetAppByAppNameFromRepository {
  (name: string): Promise<AppEntity>;
}

const getAppByAppName = async (
  appName: string
): Promise<Partial<{ app: App; error: ApiError }>> => {
  logInfo(
    `Selecting app by app name: appName: ${JSON.stringify(
      appName,
      undefined,
      2
    )}`
  );
  const app = await selectAppByAppName(appName);

  if (app) {
    const { app_id, ...restOfApp } = app;

    return {
      app: {
        id: app_id,
        ...restOfApp,
      },
    };
  }

  logInfo(`App by the name of ${appName} not found`);

  return {
    error: {
      details: "App not found",
      type: "NotFound",
    },
  };
};

interface CreateAppInRepository {
  (app: { name: string }): Promise<AppEntity>;
}

const createApp = async (appName: string): Promise<App> => {
  logInfo(`Inserting app: ${appName}`);
  const { app_id, ...restOfApp } = await insertApp({ name: appName });

  return {
    id: app_id,
    ...restOfApp,
  };
};

interface GetAllAppsFromRepository {
  (): Promise<AppEntity[]>;
}

const getAllApps = async (): Promise<App[]> => {
  logInfo("Selecting all apps");
  const appEntities = await selectAllApps();

  return appEntities.map(({ app_id, ...restOfApp }) => ({
    id: app_id,
    ...restOfApp,
  }));
};

export { getAppByAppName, createApp, getAllApps };

export type {
  GetAppByAppNameFromRepository,
  CreateAppInRepository,
  GetAllAppsFromRepository,
};
