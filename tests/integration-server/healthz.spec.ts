import {OK} from 'http-status';
import fetch from 'node-fetch';

import {startDORAMeterIfNotRunning, stopDORAMeter} from './server-helpers';

describe('healthz controller', () => {
    beforeAll(async () => {
        await startDORAMeterIfNotRunning();
    });

    afterAll(async () => {
        await stopDORAMeter();
    });

    describe('GET', () => {
        test('should return a 200 response with a status for each component', async () => {
            const response = await fetch('http://localhost:4444/healthz');

            expect(response.status).toBe(OK);

            const jsonResponse = await response.json();

            expect(jsonResponse).toStrictEqual({
                database: 'OK',
                server: 'OK'
            });
        });
    });
});
