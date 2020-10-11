import {ApolloError, UserInputError} from 'apollo-server-express';

import {logError} from '../server-infra/logger-service';

const isValidationResult = (error: any): boolean =>
    Array.isArray(error.details)
    && error.details[0].message !== undefined
    && error instanceof Error;

export default (error: any) => {
    if (isValidationResult(error)) {
        logError(`Bad request error: ${JSON.stringify(error, null, 2)}`);
        throw new UserInputError(error.details[0].message);
    }

    logError(`Internal server error: ${JSON.stringify(error, null, 2)}`);
    throw new ApolloError('Internal server error');
};
