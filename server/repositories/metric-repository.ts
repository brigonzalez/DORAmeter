import { GetMetricGoalByMetricFromRepository } from "../services/metric-service";

import { getDBClient } from "../adapters/db-client-adapter";

const METRIC_GOAL_TABLE = "metric_goal as metricGoal";
const METRIC_TABLE = "metric as metric";
const METRIC_TO_GOAL_TABLE = "metric_to_metric_goal as metricToGoal";

export const selectMetricGoalByMetric: GetMetricGoalByMetricFromRepository =
  async (metric: string) => {
    const [metricGoal] = await getDBClient()
      .select("elite_goal", "high_goal", "medium_goal", "low_goal")
      .from(METRIC_GOAL_TABLE)
      .join(
        METRIC_TO_GOAL_TABLE,
        "metricGoal.metric_goal_id",
        "=",
        "metricToGoal.metric_goal_id"
      )
      .join(METRIC_TABLE, "metric.metric_id", "=", "metricToGoal.metric_id")
      .where({
        "metric.metric": metric,
      });

    return metricGoal;
  };
