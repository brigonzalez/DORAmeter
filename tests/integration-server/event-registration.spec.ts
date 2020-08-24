import Chance from 'chance';
import fetch from 'node-fetch';
import {CREATED, BAD_REQUEST} from 'http-status';

import {getDBClient} from '../../server/repositories/database-connection';
import {LOCALHOST_URL} from '../constants';

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
        const dbClient = getDBClient();

        let expectedEventBody: any,
            createdAppId: string;

        beforeAll(() => {
            expectedEventBody = {
                appName: chance.word(),
                buildNumber: chance.guid(),
                eventType: chance.pickone([
                    'DEPLOYMENT',
                    'CODE_COMMITTED',
                    'SUCCESSFUL_TEST',
                    'UNSUCCESSFUL_TEST'
                ])
            };
        });

        const registerEventWithPOSTRequest = (registerEventBody = expectedEventBody) =>
            fetch(`${LOCALHOST_URL}/event`, {
                body: JSON.stringify(registerEventBody),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            });

        test('should return a 201 response with an empty body', async () => {
            const response = await registerEventWithPOSTRequest();

            expect(response.status).toBe(CREATED);
            expect(response.headers.get('content-length')).toBe('0');
        });

        test('should write app to database', async () => {
            const [app] = await dbClient
                .select('app_id', 'name')
                .from('app')
                .where({
                    name: expectedEventBody.appName
                });

            createdAppId = app.app_id;
            expect(app.name).toBe(expectedEventBody.appName);
        });

        test('should not create a new app if one was already created', async () => {
            await registerEventWithPOSTRequest();
            const [app, expectedlyNonExistentApp] = await dbClient
                .select('app_id', 'name')
                .from('app')
                .where({
                    name: expectedEventBody.appName
                });

            expect(app.name).toBe(expectedEventBody.appName);
            expect(expectedlyNonExistentApp).toBeUndefined();
        });

        test('should event to database', async () => {
            const [event] = await dbClient
                .select('event_id', 'app_id')
                .from('event')
                .where({
                    app_id: createdAppId
                });

            expect(event.event_id).toBeDefined();
            expect(event.app_id).toBeDefined();
        });

        test('should add the correct event_type_id in the event', async () => {
            const [event] = await dbClient
                .select('event_type_id')
                .from('event')
                .where({
                    app_id: createdAppId
                });
            const [eventType] = await dbClient
                .select('event_type')
                .from('event_type')
                .where({
                    event_type_id: event.event_type_id
                });

            expect(eventType.event_type).toBe(expectedEventBody.eventType);
        });

        test('should reject a request with malformed properties', async () => {
            const falsyOrStringValue = () => chance.bool() ? chance.pickone([undefined, null]) : chance.string();
            const malformedEventRequest = {
                appName: falsyOrStringValue(),
                buildNumber: falsyOrStringValue(),
                eventType: chance.string()
            };
            const response = await registerEventWithPOSTRequest(malformedEventRequest);

            expect(response.status).toBe(BAD_REQUEST);

            const jsonResponse = await response.json();

            expect(jsonResponse.error).toContain('Error validating request.');
        });

        test('should reject a request with a malformed object', async () => {
            const malformedEventRequest = {
                [chance.string()]: chance.string(),
                appName: chance.string(),
                buildNumber: chance.string(),
                eventType: 'CODE_COMMITTED'
            };
            const response = await registerEventWithPOSTRequest(malformedEventRequest);

            expect(response.status).toBe(BAD_REQUEST);

            const jsonResponse = await response.json();

            expect(jsonResponse.error).toContain('Error validating request.');
        });
    });
});
