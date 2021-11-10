import type { NextApiRequest, NextApiResponse } from "next";
import { withLoggingAndErrorHandling } from "../../../server/helpers/controller-helpers";
import { OK } from "http-status";
import {
  DeploymentFrequency,
  getDeploymentFrequencies,
} from "../../../server/services/deployment-frequency-service";

export default withLoggingAndErrorHandling({
  GET: async (
    req: NextApiRequest,
    res: NextApiResponse<DeploymentFrequency[]>
  ) => {
    const deploymentFrequencies = await getDeploymentFrequencies();

    res.status(OK).json(deploymentFrequencies);
  },
});
