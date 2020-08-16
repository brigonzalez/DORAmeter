import path from 'path';

import express, {Express} from 'express';
import joi from '@hapi/joi';
import {Schema} from 'hapi__joi'; // eslint-disable-line import/no-unresolved
import globby from 'globby';
import {createValidator} from 'express-joi-validation';

import {registerGraphQL} from './graphql-server';
import {logInfo} from './logger-service';

const PORT: number = 4444;

const createValidators = (bodyValidator: Schema = joi.any()) => {
    const validator = createValidator();

    return [
        validator.body(bodyValidator)
    ];
};

const registerEndpoints = async (app: Express) => {
    const controllerFilePaths = await globby('dist-server/controllers/**/*.js');

    controllerFilePaths.forEach((controllerPath) => {
        const fullControllerPath = path.join(__dirname, '..', '..', `${path.sep + controllerPath}`);
        const {handler, path: endpointPath, method, bodyValidator} = require(fullControllerPath);
        const validators = createValidators(bodyValidator);

        // @ts-ignore
        app[method](endpointPath, ...validators, handler);
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

    return app.listen(PORT, () =>
        logInfo(`🚀 Server ready on port ${PORT}`)
    );
};
