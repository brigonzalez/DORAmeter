import {ApolloError, UserInputError} from 'apollo-server-express';

const isValidationResult = (error: any): boolean =>
    Array.isArray(error.details)
    && error.details[0].message !== undefined
    && error instanceof Error;

export default (error: any) => {
    if (isValidationResult(error)) {
        throw new UserInputError(error.details[0].message);
    }

    throw new ApolloError('Internal server error');
};
