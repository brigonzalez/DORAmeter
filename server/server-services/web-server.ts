import path from 'path';

import express, {Express} from 'express';
import globby from 'globby';

import {registerGraphQL} from './graphql-server';
import {logInfo} from './logger-service';

const PORT: number = 4444;

const registerEndpoints = async (app: Express) => {
    const controllerFilePaths = await globby('dist-server/controllers/**/*.js');

    /* istanbul ignore next: the following is tested by integration tests */
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

export const startServer = async (): Promise<any> => {
    const app = express();

    registerGraphQL(app);
    registerClient(app);
    registerJSONParsingMiddleware(app);
    await registerEndpoints(app);

    app.listen(PORT, () =>
        logInfo(`🚀 Server ready on port ${PORT}`)
    );
};
