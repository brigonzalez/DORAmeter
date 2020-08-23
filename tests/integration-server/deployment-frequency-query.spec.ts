import Chance from 'chance';
import {GraphQLClient, gql} from 'graphql-request';

import {getDBClient} from '../../server/repositories/database-connection';
import {LOCALHOST_URL} from '../constants';

import {startDORAMeterIfNotRunning, stopDORAMeter} from './server-helpers';

describe('deployment frequency query', () => {
    const chance = new Chance();
    const dbClient = getDBClient();
    const gqlClient = new GraphQLClient(`${LOCALHOST_URL}/graphql`);

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

    const setupTestsForDeploymentFrequency = async (appName: string,
        lastDeploymentTimestamp: string,
        followingDeploymentTimestamp: string) => {
        const appId = await insertApp(appName);

        await insertEvent(appId, lastDeploymentTimestamp);
        await insertEvent(appId, followingDeploymentTimestamp);
    };

    const makeGQLRequestToRetrieveDeploymentFrequency = async (appName: string) => {
        const data = await gqlClient.request(gql`
            query getAppDeploymentFrequency($appName: String!) {
                app(name: $appName) {
                    name
                    deploymentFrequency {
                        rating
                        lastDeploymentTimestamp
                        followingDeploymentTimestamp
                    }
                }
            }
        `, {appName});

        return JSON.parse(data);
    };

    describe('elite performing deployment frequency app', () => {
        const elitePerformingAppName = chance.word();
        const lastDeploymentTimestamp = '2020-08-20 18:43:03.028739';
        const followingDeploymentTimestamp = '2020-08-20 17:43:03.028739';

        beforeAll(async () => {
            await setupTestsForDeploymentFrequency(elitePerformingAppName, lastDeploymentTimestamp, followingDeploymentTimestamp);
        });

        test('should return elite rating for deployment frequency app', async () => {
            const data = await makeGQLRequestToRetrieveDeploymentFrequency(elitePerformingAppName);

            expect(data.app).toStrictEqual({
                deploymentFrequency: {
                    followingDeploymentTimestamp,
                    lastDeploymentTimestamp,
                    rating: 'ELITE'
                },
                name: elitePerformingAppName
            });
        });
    });

    describe('high performing deployment frequency app', () => {
        const highPerformingAppName = chance.word();
        const lastDeploymentTimestamp = '2020-08-21 14:43:03.028739';
        const followingDeploymentTimestamp = '2020-08-20 12:43:03.028739';

        beforeAll(async () => {
            await setupTestsForDeploymentFrequency(highPerformingAppName, lastDeploymentTimestamp, followingDeploymentTimestamp);
        });

        test('should return elite rating for deployment frequency app', async () => {
            const data = await makeGQLRequestToRetrieveDeploymentFrequency(highPerformingAppName);

            expect(data.app).toStrictEqual({
                deploymentFrequency: {
                    followingDeploymentTimestamp,
                    lastDeploymentTimestamp,
                    rating: 'HIGH'
                },
                name: highPerformingAppName
            });
        });
    });

    describe('medium performing deployment frequency app', () => {
        const mediumPerformingAppName = chance.word();
        const lastDeploymentTimestamp = '2020-08-21 14:43:03.028739';
        const followingDeploymentTimestamp = '2020-08-14 10:43:03.028739';

        beforeAll(async () => {
            await setupTestsForDeploymentFrequency(mediumPerformingAppName, lastDeploymentTimestamp, followingDeploymentTimestamp);
        });

        test('should return elite rating for deployment frequency app', async () => {
            const data = await makeGQLRequestToRetrieveDeploymentFrequency(mediumPerformingAppName);

            expect(data.app).toStrictEqual({
                deploymentFrequency: {
                    followingDeploymentTimestamp,
                    lastDeploymentTimestamp,
                    rating: 'MEDIUM'
                },
                name: mediumPerformingAppName
            });
        });
    });

    describe('low performing deployment frequency app', () => {
        const lowPerformingAppName = chance.word();
        const lastDeploymentTimestamp = '2020-08-21 14:43:03.028739';
        const followingDeploymentTimestamp = '2020-07-20 08:43:03.028739';

        beforeAll(async () => {
            await setupTestsForDeploymentFrequency(lowPerformingAppName, lastDeploymentTimestamp, followingDeploymentTimestamp);
        });

        test('should return elite rating for deployment frequency app', async () => {
            const data = await makeGQLRequestToRetrieveDeploymentFrequency(lowPerformingAppName);

            expect(data.app).toStrictEqual({
                deploymentFrequency: {
                    followingDeploymentTimestamp,
                    lastDeploymentTimestamp,
                    rating: 'LOW'
                },
                name: lowPerformingAppName
            });
        });
    });

    describe('nonperforming deployment frequency app', () => {
        const nonPerformingAppName = chance.word();
        const lastDeploymentTimestamp = '2020-08-21 14:43:03.028739';
        const followingDeploymentTimestamp = '2020-01-20 09:43:03.028739';

        beforeAll(async () => {
            await setupTestsForDeploymentFrequency(nonPerformingAppName, lastDeploymentTimestamp, followingDeploymentTimestamp);
        });

        test('should return elite rating for deployment frequency app', async () => {
            const data = await makeGQLRequestToRetrieveDeploymentFrequency(nonPerformingAppName);

            expect(data.app).toStrictEqual({
                deploymentFrequency: {
                    followingDeploymentTimestamp,
                    lastDeploymentTimestamp,
                    rating: 'NONE'
                },
                name: nonPerformingAppName
            });
        });
    });
});
