import path from 'path';

import express, {Express} from 'express';
import globby from 'globby';
import httpPino from 'pino-http';

import {registerGraphQL} from './graphql-server';
import {loggerInstance, logInfo} from './logger-service';

const PORT: number = 4444;

const registerEndpoints = async (app: Express) => {
    const controllerFilePaths = await globby('dist-server/controllers/**/*.js');

    controllerFilePaths.forEach((controllerPath) => {
        const fullControllerPath = path.join(__dirname, '..', '..', `${path.sep + controllerPath}`);
        const {handler, path: endpointPath, method} = require(fullControllerPath);

        // @ts-ignore
        app[method](endpointPath, handler);
    });
};

const registerClient = (app: Express): void => {
    app.use(express.static('dist-client'));
};

const registerJSONParsingMiddleware = (app: Express): void => {
    app.use(express.json());
};

const registerLoggingMiddleware = (app: Express): void => {
    const logger = httpPino(loggerInstance);

    app.use(logger);
};

export const startServer = async (): Promise<any> => {
    const app = express();

    registerGraphQL(app);
    registerClient(app);
    registerJSONParsingMiddleware(app);
    registerLoggingMiddleware(app);
    await registerEndpoints(app);

    return app.listen(PORT, () =>
        logInfo(`🚀 Server ready on port ${PORT}`)
    );
};
