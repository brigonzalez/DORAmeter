import {selectMetricGoalByMetric} from '../../repositories/metric-repository';
import {logInfo} from '../../server-infra/logger-service';

export interface getMetricGoalByMetricFromRepository {
    (metric: string): Promise<{
        elite_goal: string,
        high_goal: string,
        medium_goal: string,
        low_goal: string
    }>
}

export const getMetricGoalByMetric = (metric: string) => {
    logInfo(`Selecting metric goal by metric: metric: ${metric}`);

    return selectMetricGoalByMetric(metric);
};
