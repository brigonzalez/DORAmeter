import pino from "pino";

const logger = pino({
  prettyPrint: true,
  timestamp: pino.stdTimeFunctions.isoTime,
});

const logInfo = (log: string): void => logger.info(log);

const logError = (log: Error): void => logger.error(log);

export { logInfo, logError };
