import Chance from 'chance';
import {GraphQLClient, gql} from 'graphql-request';
import sub from 'date-fns/sub';

import {getDBClient} from '../../server/repositories/database-connection';
import {LOCALHOST_URL} from '../constants';

import {startDORAMeterIfNotRunning, stopDORAMeter} from './server-helpers';

describe('apps query', () => {
    const chance = new Chance();
    const dbClient = getDBClient();
    const gqlClient = new GraphQLClient(`${LOCALHOST_URL}/graphql`);

    let firstAppName: string,
        secondAppName: string,
        firstDeploymentTimestamp: Date,
        secondDeploymentTimestamp: Date;

    const insertApp = async (appName: string) => {
        const [{app_id}] = await dbClient
            .returning('*')
            .insert({
                name: appName
            })
            .into('app');

        return app_id;
    };

    const insertEvent = async (appIdToInsert: string, createdTimestamp: string) => {
        const [{event_type_id}] = await dbClient
            .select('event_type_id', 'event_type')
            .from('event_type')
            .where({
                event_type: 'DEPLOYMENT'
            });

        await dbClient
            .insert({
                app_id: appIdToInsert,
                created_timestamp: createdTimestamp,
                event_type_id
            })
            .into('event');
    };

    const setupTestsForDeploymentFrequency = async () => {
        firstAppName = chance.word();
        secondAppName = chance.word();
        firstDeploymentTimestamp = sub(new Date(), {
            days: chance.d6() + 1
        });
        secondDeploymentTimestamp = sub(new Date(), {
            days: chance.d6() + 1
        });

        const appIdForAppInsert1 = await insertApp(firstAppName);
        const appIdForAppInsert2 = await insertApp(secondAppName);

        await insertEvent(appIdForAppInsert1, firstDeploymentTimestamp.toISOString());
        await insertEvent(appIdForAppInsert2, secondDeploymentTimestamp.toISOString());
    };

    const makeGQLRequestToRetrieveDeploymentFrequency = async () => {
        const data = await gqlClient.request(gql`
            query getAllApps {
                apps {
                    id
                    name
                    deploymentFrequency {
                        rating
                        lastDeploymentTimestamp
                    }
                }
            }
        `);

        return data;
    };

    beforeAll(async () => {
        await startDORAMeterIfNotRunning();
        await setupTestsForDeploymentFrequency();
    });

    afterAll(async () => {
        await stopDORAMeter();
    });

    test('should return all metrics for all apps', async () => {
        const data = await makeGQLRequestToRetrieveDeploymentFrequency();
        const firstAppDeploymentFrequency = data.apps.find((app: {name: string}) =>
            app.name === firstAppName).deploymentFrequency;
        const secondAppDeploymentFrequency = data.apps.find((app: {name: string}) =>
            app.name === secondAppName).deploymentFrequency;

        expect(firstAppDeploymentFrequency).toStrictEqual({
            lastDeploymentTimestamp: firstDeploymentTimestamp.toISOString(),
            rating: 'HIGH'
        });
        expect(secondAppDeploymentFrequency).toStrictEqual({
            lastDeploymentTimestamp: secondDeploymentTimestamp.toISOString(),
            rating: 'HIGH'
        });
    });
});
