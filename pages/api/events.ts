import type { NextApiRequest, NextApiResponse } from "next";
import { withLoggingAndErrorHandling } from "../../server/helpers/controller-helpers";
import { BAD_REQUEST, CREATED } from "http-status";
import { registerEvent } from "../../server/services/event-registration-service";

export default withLoggingAndErrorHandling({
  POST: async (req: NextApiRequest, res: NextApiResponse) => {
    const eventResult = await registerEvent(req.body);

    if (eventResult.error?.type === "BadRequest") {
      res.status(BAD_REQUEST).json({
        message: eventResult.error.details,
      });
    } else {
      res.status(CREATED).json(eventResult.event);
    }
  },
});
