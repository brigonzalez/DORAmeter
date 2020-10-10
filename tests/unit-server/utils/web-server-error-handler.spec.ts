import Chance from 'chance';
import {INTERNAL_SERVER_ERROR, BAD_REQUEST} from 'http-status';

import webServerErrorHandler from '../../../server/utils/rest-error-handler';

describe('web-server-error-handler', () => {
    const chance = new Chance();

    let expectedResponse: any;

    beforeEach(() => {
        expectedResponse = {
            status: jest.fn().mockReturnValue({
                send: jest.fn()
            })
        };
    });

    test('should call status with BAD_REQUEST and return an error message', () => {
        const errorMessage = chance.string();
        const expectedError = new Error();

        // @ts-ignore
        expectedError.details = [{
            message: errorMessage
        }];

        // @ts-ignore
        webServerErrorHandler(expectedError, expectedResponse);

        expect(expectedResponse.status).toHaveBeenCalledTimes(1);
        expect(expectedResponse.status).toHaveBeenCalledWith(BAD_REQUEST);

        const mockedStatusFunction = expectedResponse.status.mock.results[0].value.send;

        expect(mockedStatusFunction).toHaveBeenCalledTimes(1);
        expect(mockedStatusFunction).toHaveBeenCalledWith({
            error: `Error validating request. ${errorMessage}`
        });
    });

    test('should call status with INTERNAL_SERVER_ERROR and return an empty JSON body', () => {
        // @ts-ignore
        webServerErrorHandler({}, expectedResponse);

        expect(expectedResponse.status).toHaveBeenCalledTimes(1);
        expect(expectedResponse.status).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);

        const mockedStatusFunction = expectedResponse.status.mock.results[0].value.send;

        expect(mockedStatusFunction).toHaveBeenCalledTimes(1);
        expect(mockedStatusFunction).toHaveBeenCalledWith({});
    });
});
