import Chance from 'chance';

import {logInfo, logError} from '../../../server/server-services/logger-service';

describe('logger service', () => {
    const chance = new Chance();

    describe('info', () => {
        let expectedLog;

        beforeEach(() => {
            expectedLog = chance.string();
            jest.spyOn(console, 'log');
        });

        test('should call console log', () => {
            logInfo(expectedLog);

            expect(console.log).toHaveBeenCalledTimes(1);
            expect(console.log).toHaveBeenCalledWith(expectedLog);
        });
    });

    describe('error', () => {
        let expectedLog;

        beforeEach(() => {
            expectedLog = chance.string();
            jest.spyOn(console, 'error');
        });
        test('should call console error', () => {
            logError(expectedLog);

            expect(console.error).toHaveBeenCalledTimes(1);
            expect(console.error).toHaveBeenCalledWith(expectedLog);
        });
    });
});
