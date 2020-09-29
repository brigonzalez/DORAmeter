import differenceInHours from 'date-fns/differenceInHours';
import parseJSON from 'date-fns/parseJSON';

import {getAppByAppName} from '../domain-services/app-service';
import {getLastEventByAppIdAndEventTypeId} from '../domain-services/event-service';
import {getEventTypeByEventType} from '../domain-services/event-type-service';
import {getMetricGoalByMetric} from '../domain-services/metric-service';

const rating_map = {
    elite_goal: 'ELITE',
    high_goal: 'HIGH',
    low_goal: 'LOW',
    medium_goal: 'MEDIUM'
};

export default async (appName: string) => {
    const {app_id} = await getAppByAppName(appName);
    const {event_type_id} = await getEventTypeByEventType('DEPLOYMENT');
    const {created_timestamp} = await getLastEventByAppIdAndEventTypeId(app_id, event_type_id);
    const lastDeploymentDate = parseJSON(created_timestamp);
    const differenceBWCurrentTimeAndLastDeploymentDate = differenceInHours(lastDeploymentDate, new Date());
    const metricGoals = await getMetricGoalByMetric('DEPLOYMENT_FREQUENCY');
    const correspondingMetricGoal = Object.keys(metricGoals).find((metricGoal) =>
        // @ts-ignore
        metricGoals[metricGoal] <= differenceBWCurrentTimeAndLastDeploymentDate);

    return {
        lastDeploymentTimestamp: lastDeploymentDate,
        // @ts-ignore
        rating: rating_map[correspondingMetricGoal]
    };
};
