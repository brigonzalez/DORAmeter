import Chance from 'chance';
import fetch from 'node-fetch';
import {CREATED} from 'http-status';

import {startDORAMeterIfNotRunning, stopDORAMeter} from './server-helpers';

describe('event registration controller', () => {
    const chance = new Chance();

    beforeAll(async () => {
        await startDORAMeterIfNotRunning();
    });

    afterAll(async () => {
        await stopDORAMeter();
    });

    describe('POST', () => {
        test('should return a 201 response with an empty body', async () => {
            const response = await fetch('http://localhost:4444/event', {
                body: JSON.stringify({
                    appName: chance.word(),
                    buildNumber: chance.guid(),
                    eventType: chance.pickone([
                        'DEPLOYMENT',
                        'CODE_COMMITTED',
                        'SUCCESSFUL_TEST',
                        'UNSUCCESSFUL_TEST'
                    ])
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            });

            expect(response.status).toBe(CREATED);
            expect(response.headers.get('content-length')).toBe('0');
        });
    });
});
