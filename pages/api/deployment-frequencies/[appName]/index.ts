import type { NextApiRequest, NextApiResponse } from "next";
import { withLoggingAndErrorHandling } from "../../../../server/helpers/controller-helpers";
import { NOT_FOUND, OK } from "http-status";
import { getDeploymentFrequencyByAppName } from "../../../../server/services/deployment-frequency-service";

export default withLoggingAndErrorHandling({
  GET: async (req: NextApiRequest, res: NextApiResponse) => {
    const deploymentFrequencyResult = await getDeploymentFrequencyByAppName(
      req.query.appName as string
    );

    if (deploymentFrequencyResult.error?.type === "NotFound") {
      res.status(NOT_FOUND).json({
        message: deploymentFrequencyResult.error.details,
      });
    } else {
      res.status(OK).json(deploymentFrequencyResult.deploymentFrequency);
    }
  },
});
