import pino from 'pino';

const logger = pino({
    prettyPrint: true,
    timestamp: pino.stdTimeFunctions.isoTime
});

export const loggerInstance = logger;

export const logInfo = (log: string) => logger.info(log);

export const logError = (log: string) => logger.error(log);
