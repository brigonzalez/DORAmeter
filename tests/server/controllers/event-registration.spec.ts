import Chance from 'chance';
import {CREATED} from 'http-status';

import {handler} from '../../../server/controllers/event-registration';

describe('event registration controller', () => {
    const chance = new Chance();

    describe('handler', () => {
        let expectedResponse,
            expectedRequest;

        beforeEach(() => {
            expectedResponse = {
                status: jest.fn().mockReturnValue({
                    send: jest.fn()
                })
            };
            expectedRequest = {
                body: {
                    [chance.string()]: chance.string()
                }
            };
        });

        test('should return a CREATED response', async () => {
            await handler(expectedRequest, expectedResponse);

            expect(expectedResponse.status).toHaveBeenCalledTimes(1);
            expect(expectedResponse.status).toHaveBeenCalledWith(CREATED);

            const statusResponse = expectedResponse.status.mock.results[0].value;

            expect(statusResponse.send).toHaveBeenCalledTimes(1);
            expect(statusResponse.send).toHaveBeenCalledWith();
        });
    });
});
