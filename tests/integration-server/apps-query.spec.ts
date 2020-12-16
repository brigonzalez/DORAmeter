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

    let appId: string,
        highPerformingAppName: string,
        lastDeploymentTimestamp: Date;

    const insertApp = async (appName: string) => {
        const [{app_id}] = await dbClient
            .returning('*')
            .insert({
                name: appName
            })
            .into('app');

        return app_id;
    };

    const insertEvent = async (appId: string, createdTimestamp: string) => {
        const [{event_type_id}] = await dbClient
            .select('event_type_id', 'event_type')
            .from('event_type')
            .where({
                event_type: 'DEPLOYMENT'
            });

        await dbClient
            .insert({
                app_id: appId,
                created_timestamp: createdTimestamp,
                event_type_id
            })
            .into('event');
    };

    const setupTestsForDeploymentFrequency = async (
        appName: string,
        deploymentTimestamp: Date
    ) => {
        const appIdForAppInsert = await insertApp(appName);

        await insertEvent(appIdForAppInsert, deploymentTimestamp.toISOString());

        return appId;
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
        highPerformingAppName = chance.word();
        lastDeploymentTimestamp = sub(new Date(), {
            days: chance.d6() + 1
        });
        appId = await setupTestsForDeploymentFrequency(highPerformingAppName, lastDeploymentTimestamp);
    });

    afterAll(async () => {
        await stopDORAMeter();
    });

    test('should return all metrics for all apps', async () => {
        const data = await makeGQLRequestToRetrieveDeploymentFrequency();

        expect(data.app).toStrictEqual({
            deploymentFrequency: {
                lastDeploymentTimestamp: lastDeploymentTimestamp.toISOString(),
                rating: 'HIGH'
            },
            id: appId,
            name: highPerformingAppName
        });
    });
});
