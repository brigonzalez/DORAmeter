import differenceInHours from 'date-fns/differenceInHours';
import parseJSON from 'date-fns/parseJSON';
import format from 'date-fns/format';
import getDate from 'date-fns/getDate';

import {getAppByAppName} from '../domain-services/app-service';
import {getLastEventByAppIdAndEventTypeId} from '../domain-services/event-service';
import {getEventTypeByEventType} from '../domain-services/event-type-service';
import {getMetricGoalByMetric} from '../domain-services/metric-service';
import {logError, logInfo} from '../../server-infra/logger-service';

const mapRating = (rating: string | null) => {
    switch (rating) {
        case 'elite_goal':
            return 'ELITE';
        case 'high_goal':
            return 'HIGH';
        case 'low_goal':
            return 'LOW';
        case 'medium_goal':
            return 'MEDIUM';
        default:
            return 'NONE';
    }
};

const getLastDeploymentDateForApp = async (app_id: string) => {
    const {event_type_id} = await getEventTypeByEventType('DEPLOYMENT');
    let lastEvent: {created_timestamp: any} = await getLastEventByAppIdAndEventTypeId(app_id, event_type_id);

    if (!lastEvent) {
        lastEvent = {
            created_timestamp: getDate(new Date(1969, 12, 28))
        };
    }

    const stringUTCLastDeploymentDate = parseJSON(lastEvent.created_timestamp);
    const localLastDeploymentDate = format(stringUTCLastDeploymentDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

    return parseJSON(localLastDeploymentDate);
};

const getCorrespondingMetricGoal = (
    metricGoals: {[x: string]: string}, differenceBWCurrentTimeAndLastDeploymentDate: number) => {
    let correspondingMetricGoal: string | null = null;

    Object.keys(metricGoals).forEach((metricGoal) => {
        // @ts-ignore
        const numericMetricGoal = parseInt(metricGoals[metricGoal]);

        if (numericMetricGoal >= differenceBWCurrentTimeAndLastDeploymentDate) {
            correspondingMetricGoal = !correspondingMetricGoal ||
            // @ts-ignore
            numericMetricGoal < parseInt(metricGoals[correspondingMetricGoal])
                ? metricGoal : correspondingMetricGoal;
        }
    });

    return correspondingMetricGoal;
};

const getDeploymentFrequencyRating = async (lastDeploymentDate: Date) => {
    const metricGoals = await getMetricGoalByMetric('DEPLOYMENT_FREQUENCY');
    const differenceBWCurrentTimeAndLastDeploymentDate = differenceInHours(new Date(), lastDeploymentDate);
    const correspondingMetricGoal =
        getCorrespondingMetricGoal(metricGoals, differenceBWCurrentTimeAndLastDeploymentDate);

    return mapRating(correspondingMetricGoal);
};

export default async (appName: string) => {
    try {
        logInfo('Getting deployment frequency');
        const {app} = await getAppByAppName(appName);
        const lastDeploymentDate = await getLastDeploymentDateForApp(app.app_id);
        const rating = getDeploymentFrequencyRating(lastDeploymentDate);

        return {
            error: null,
            lastDeploymentTimestamp: lastDeploymentDate.toISOString(),
            rating
        };
    } catch (error) {
        logError(error);

        return {
            error
        };
    }
};
