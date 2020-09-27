import {selectMetricGoalByMetric} from '../../repositories/metric-repository';

export interface getMetricGoalByMetricFromRepository {
    (metric: string): Promise<{
        elite_goal: string,
        high_goal: string,
        medium_goal: string,
        low_goal: string
    }>
}

export const getMetricGoalByMetric = (metric: string) =>
    selectMetricGoalByMetric(metric);
