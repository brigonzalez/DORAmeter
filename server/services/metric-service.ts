import { selectMetricGoalByMetric } from "../repositories/metric-repository";
import { logInfo } from "../helpers/logger-helpers";
import type { MetricGoal } from "../../types/metric-goal.types";

export interface GetMetricGoalByMetricFromRepository {
  (metric: string): Promise<{
    elite_goal: string;
    high_goal: string;
    medium_goal: string;
    low_goal: string;
  }>;
}

export const getMetricGoalByMetric = async (
  metric: string
): Promise<MetricGoal> => {
  logInfo(`Selecting metric goal by metric: metric: ${metric}`);

  const { elite_goal, high_goal, medium_goal, low_goal } =
    await selectMetricGoalByMetric(metric);

  return {
    elite: elite_goal,
    high: high_goal,
    low: low_goal,
    medium: medium_goal,
  };
};
