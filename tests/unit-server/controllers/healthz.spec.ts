import {OK} from 'http-status';

import {handler} from '../../../server/controllers/healthz';
import {areRepositoriesHealthy} from '../../../server/services/api-services/healthz-services';

jest.mock('../../../server/services/api-services/healthz-services');

describe('healthz controller', () => {
    describe('handler', () => {
        let expectedResponse: any;

        beforeEach(() => {
            expectedResponse = {
                status: jest.fn().mockReturnValue({
                    send: jest.fn()
                })
            };
        });

        test('should check that the repository is healthy', async () => {
            // @ts-ignore
            await handler(null, expectedResponse);

            expect(areRepositoriesHealthy).toHaveBeenCalledTimes(1);
            expect(areRepositoriesHealthy).toHaveBeenCalledWith();
        });

        describe('areRepositoriesHealthy returns falsey', () => {
            test('should return an OK with the right body', async () => {
                // @ts-ignore
                await handler(null, expectedResponse);

                expect(expectedResponse.status).toHaveBeenCalledTimes(1);
                expect(expectedResponse.status).toHaveBeenCalledWith(OK);

                const statusResponse = expectedResponse.status.mock.results[0].value;

                expect(statusResponse.send).toHaveBeenCalledTimes(1);
                expect(statusResponse.send).toHaveBeenCalledWith({
                    database: 'Not OK',
                    server: 'OK'
                });
            });
        });

        describe('areRepositoriesHealthy returns truthy', () => {
            beforeEach(() => {
                (areRepositoriesHealthy as jest.Mock).mockResolvedValue(true);
            });

            test('should return an OK with the right body', async () => {
                // @ts-ignore
                await handler(null, expectedResponse);

                expect(expectedResponse.status).toHaveBeenCalledTimes(1);
                expect(expectedResponse.status).toHaveBeenCalledWith(OK);

                const statusResponse = expectedResponse.status.mock.results[0].value;

                expect(statusResponse.send).toHaveBeenCalledTimes(1);
                expect(statusResponse.send).toHaveBeenCalledWith({
                    database: 'OK',
                    server: 'OK'
                });
            });
        });
    });
});
