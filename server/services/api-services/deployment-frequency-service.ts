import differenceInHours from 'date-fns/differenceInHours';
import parseJSON from 'date-fns/parseJSON';
import format from 'date-fns/format';

import {getAppByAppName} from '../domain-services/app-service';
import {getLastEventByAppIdAndEventTypeId} from '../domain-services/event-service';
import {getEventTypeByEventType} from '../domain-services/event-type-service';
import {getMetricGoalByMetric} from '../domain-services/metric-service';

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

export default async (appName: string) => {
    const {app_id} = await getAppByAppName(appName);
    const {event_type_id} = await getEventTypeByEventType('DEPLOYMENT');
    const {created_timestamp} = await getLastEventByAppIdAndEventTypeId(app_id, event_type_id);

    // possible start of function here
    const stringUTCLastDeploymentDate = parseJSON(created_timestamp);
    const localLastDeploymentDate = format(stringUTCLastDeploymentDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    const stringLocalLastDeploymentDate = parseJSON(localLastDeploymentDate);
    const differenceBWCurrentTimeAndLastDeploymentDate = differenceInHours(new Date(), stringLocalLastDeploymentDate);
    // possible end of function here

    const metricGoals = await getMetricGoalByMetric('DEPLOYMENT_FREQUENCY');

    // possible start of function here
    let correspondingMetricGoal: string | null = null;

    // needs refactoring
    Object.keys(metricGoals).forEach((metricGoal) => {
        // @ts-ignore
        const numericMetricGoal = parseInt(metricGoals[metricGoal]);

        if (numericMetricGoal >= differenceBWCurrentTimeAndLastDeploymentDate) {
            if (correspondingMetricGoal) {
                // @ts-ignore
                correspondingMetricGoal = numericMetricGoal < parseInt(metricGoals[correspondingMetricGoal])
                    ? metricGoal : correspondingMetricGoal;
            } else {
                correspondingMetricGoal = metricGoal;
            }
        }
    });
    // possible start of function here

    return {
        lastDeploymentTimestamp: stringLocalLastDeploymentDate.toISOString(),
        rating: mapRating(correspondingMetricGoal)
    };
};
