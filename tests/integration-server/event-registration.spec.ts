import Chance from 'chance';
import fetch from 'node-fetch';
import {CREATED, BAD_REQUEST} from 'http-status';

import {getDBClient} from '../../server/repositories/database-connection';

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
        let expectedEventBody,
            createdAppId;

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
            fetch('http://localhost:4444/event', {
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
            const dbClient = getDBClient();
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
            const dbClient = getDBClient();
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
            const dbClient = getDBClient();
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
            const dbClient = getDBClient();
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

        test('should reject a request with a malformed body', async () => {
            const falsyOrStringValue = () => chance.bool() ? chance.pickone([undefined, null]) : chance.string();
            const malformedEventRequest = {
                appName: falsyOrStringValue(),
                buildNumber: falsyOrStringValue(),
                eventType: chance.string()
            };
            const response = await registerEventWithPOSTRequest(malformedEventRequest);

            expect(response.status).toBe(BAD_REQUEST);

            const textResponse = await response.text();

            expect(textResponse).toContain('Error validating request body.');
        });
    });
});
