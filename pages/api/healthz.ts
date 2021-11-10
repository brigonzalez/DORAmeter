import type { NextApiRequest, NextApiResponse } from "next";

import { OK } from "http-status";

import { withLoggingAndErrorHandling } from "../../server/helpers/controller-helpers";
import { areRepositoriesHealthy } from "../../server/services/healthz-service";

type Data = {
  server: string;
  database: string;
};

export default withLoggingAndErrorHandling({
  GET: async (
    req: NextApiRequest,
    res: NextApiResponse<Data | { message: string }>
  ) => {
    if (req.method === "GET") {
      const database = (await areRepositoriesHealthy()) ? "OK" : "Not OK";

      res.status(OK).json({
        database,
        server: "OK",
      });

      return;
    }

    res.status(404).json({
      message: "route not found",
    });
  },
});
