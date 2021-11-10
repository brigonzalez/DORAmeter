import type { NextApiRequest, NextApiResponse } from "next";
import { withLoggingAndErrorHandling } from "../../../server/helpers/controller-helpers";
import {
  getAllApps,
  getAppByAppName,
} from "../../../server/services/app-service";
import { NOT_FOUND, OK } from "http-status";

export default withLoggingAndErrorHandling({
  GET: async (req: NextApiRequest, res: NextApiResponse) => {
    const appName = req.query.name as string;

    if (appName) {
      const appResult = await getAppByAppName(appName);

      if (appResult.error?.type === "NotFound") {
        res.status(NOT_FOUND).json({
          message: appResult.error.details,
        });
      } else {
        res.status(OK).json([appResult.app]);
      }
    } else {
      const apps = await getAllApps();

      res.status(OK).json(apps);
    }
  },
});
