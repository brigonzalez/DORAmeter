import Chance from 'chance';
import {request} from 'graphql-request';

import {getDBClient} from '../../server/repositories/database-connection';

import {startDORAMeterIfNotRunning, stopDORAMeter} from './server-helpers';

describe('deployment frequency query', () => {
    const chance = new Chance();
    const dbClient = getDBClient();

    beforeAll(async () => {
        await startDORAMeterIfNotRunning();
    });

    afterAll(async () => {
        await stopDORAMeter();
    });

    /*
     * 1. insert directly into database to control timestamp
     * 2. test results from graphql-query to ensure that the correct rating is returned
     * for the deployment frequency
     */

    const insertEvent = async (appName, createdTimestamp) => {
        const [{app_id}] = await dbClient
            .returning('*')
            .insert({
                name: appName
            })
            .into('app');
        const [{event_type_id}] = await dbClient
            .select('event_type_id', 'event_type')
            .from('event_type')
            .where({
                event_type: 'DEPLOYMENT'
            });

        await dbClient
            .insert({
                app_id,
                created_timestamp: createdTimestamp,
                event_type_id
            })
            .into('event');
    };

    describe('elite performing deployment frequency app', () => {
        const eliteAppName = chance.word();
        const lastDeploymentTimestamp = chance.timestamp();
        const secondToLastDeploymentTimestamp = chance.timestamp(); // must limit this one to before the var above

        beforeAll(async () => {
            await insertEvent(eliteAppName, lastDeploymentTimestamp);
            await insertEvent(eliteAppName, secondToLastDeploymentTimestamp);
        });
    });

    describe('high performing deployment frequency app', () => {

    });

    describe('medium performing deployment frequency app', () => {

    });

    describe('low performing deployment frequency app', () => {

    });
});
