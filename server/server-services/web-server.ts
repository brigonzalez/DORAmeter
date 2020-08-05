import path from 'path';

import express, {Express} from 'express';
import globby from 'globby';

import {registerGraphQL} from './graphql-server';

const PORT: number = 4000;

/* istanbul ignore next */
const registerEndpoints = async (app: Express) => {
    const controllerFilePaths = await globby('dist-server/controllers/**/*.js');

    controllerFilePaths.forEach((controllerPath) => {
        const fullControllerPath = path.join(__dirname, '..', '..', `${path.sep + controllerPath}`);
        const {handler, path: endpointPath} = require(fullControllerPath);

        app.use(endpointPath, handler);
    });
};

const registerClient = (app: Express): void => {
    app.use(express.static('dist-client'));
};

export const startServer = async (): Promise<any> => {
    const app = express();

    registerGraphQL(app);
    registerClient(app);
    await registerEndpoints(app);

    app.listen(PORT, () =>
        console.log(`🚀 Server ready on port ${PORT}`)
    );
};
