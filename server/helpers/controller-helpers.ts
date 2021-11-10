import { NextApiRequest, NextApiResponse } from "next";
import { NOT_FOUND } from "http-status";
import { logError } from "./logger-helpers";

type NextFn = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void> | void;

interface HttpFns extends Record<string, NextFn | undefined> {
  GET?: NextFn;
  POST?: NextFn;
  DELETE?: NextFn;
  PUT?: NextFn;
}

export const withLoggingAndErrorHandling =
  (httpFns: HttpFns) =>
  (req: NextApiRequest, res: NextApiResponse): Promise<void> | void => {
    try {
      const httpFn = httpFns[req.method as string];

      return httpFn
        ? httpFn(req, res)
        : res.status(NOT_FOUND).json({ message: "Route not found" });
    } catch (error) {
      logError(error as Error);

      throw error;
    }
  };
