import {Response} from 'express';
import {INTERNAL_SERVER_ERROR, BAD_REQUEST} from 'http-status';

import {logError} from '../server-infra/logger-service';

const isValidationResult = (error: any): boolean =>
    Array.isArray(error.details)
    && error.details[0].message !== undefined
    && error instanceof Error;

export default (error: any, response: Response) => {
    if (isValidationResult(error)) {
        logError(`Bad request error: ${JSON.stringify(error, null, 2)}`);
        response.status(BAD_REQUEST).send({
            error: `Error validating request. ${error.details[0].message}`
        });
    } else {
        logError(`Internal server error: ${JSON.stringify(error, null, 2)}`);
        response.status(INTERNAL_SERVER_ERROR).send({});
    }
};
