export type DeploymentFrequency = {
  lastDeploymentTimestamp: string;
  rating: "ELITE" | "HIGH" | "LOW" | "MEDIUM" | "NONE";
  appName: string;
};
