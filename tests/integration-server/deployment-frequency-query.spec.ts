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
        lastDeploymentTimestamp: string) => {
        const appId = await insertApp(appName);

        await insertEvent(appId, lastDeploymentTimestamp);

        return appId;
    };

    const makeGQLRequestToRetrieveDeploymentFrequency = async (appName: string) => {
        const data = await gqlClient.request(gql`
            query getAppDeploymentFrequency($appName: String!) {
                app(name: $appName) {
                    id
                    name
                    deploymentFrequency {
                        rating
                        lastDeploymentTimestamp
                    }
                }
            }
        `, {appName});

        return JSON.parse(data);
    };

    // need to modify lastDeploymentTimestamps to be current date minus whatever test we're running

    describe('elite performing deployment frequency app', () => {
        const elitePerformingAppName = chance.word();
        const lastDeploymentTimestamp = '2020-08-20 18:43:03.028739';

        let appId: string;

        beforeAll(async () => {
            appId = await setupTestsForDeploymentFrequency(elitePerformingAppName, lastDeploymentTimestamp);
        });

        test('should return elite rating for deployment frequency app', async () => {
            const data = await makeGQLRequestToRetrieveDeploymentFrequency(elitePerformingAppName);

            expect(data.app).toStrictEqual({
                deploymentFrequency: {
                    lastDeploymentTimestamp,
                    rating: 'ELITE'
                },
                id: appId,
                name: elitePerformingAppName
            });
        });
    });

    describe('high performing deployment frequency app', () => {
        const highPerformingAppName = chance.word();
        const lastDeploymentTimestamp = '2020-08-21 14:43:03.028739';

        let appId: string;

        beforeAll(async () => {
            appId = await setupTestsForDeploymentFrequency(highPerformingAppName, lastDeploymentTimestamp);
        });

        test('should return elite rating for deployment frequency app', async () => {
            const data = await makeGQLRequestToRetrieveDeploymentFrequency(highPerformingAppName);

            expect(data.app).toStrictEqual({
                deploymentFrequency: {
                    lastDeploymentTimestamp,
                    rating: 'HIGH'
                },
                id: appId,
                name: highPerformingAppName
            });
        });
    });

    describe('medium performing deployment frequency app', () => {
        const mediumPerformingAppName = chance.word();
        const lastDeploymentTimestamp = '2020-08-21 14:43:03.028739';

        let appId: string;

        beforeAll(async () => {
            appId = await setupTestsForDeploymentFrequency(mediumPerformingAppName, lastDeploymentTimestamp);
        });

        test('should return elite rating for deployment frequency app', async () => {
            const data = await makeGQLRequestToRetrieveDeploymentFrequency(mediumPerformingAppName);

            expect(data.app).toStrictEqual({
                deploymentFrequency: {
                    lastDeploymentTimestamp,
                    rating: 'MEDIUM'
                },
                id: appId,
                name: mediumPerformingAppName
            });
        });
    });

    describe('low performing deployment frequency app', () => {
        const lowPerformingAppName = chance.word();
        const lastDeploymentTimestamp = '2020-08-21 14:43:03.028739';

        let appId: string;

        beforeAll(async () => {
            appId = await setupTestsForDeploymentFrequency(lowPerformingAppName, lastDeploymentTimestamp);
        });

        test('should return elite rating for deployment frequency app', async () => {
            const data = await makeGQLRequestToRetrieveDeploymentFrequency(lowPerformingAppName);

            expect(data.app).toStrictEqual({
                deploymentFrequency: {
                    lastDeploymentTimestamp,
                    rating: 'LOW'
                },
                id: appId,
                name: lowPerformingAppName
            });
        });
    });

    describe('nonperforming deployment frequency app', () => {
        const nonPerformingAppName = chance.word();
        const lastDeploymentTimestamp = '2020-08-21 14:43:03.028739';

        let appId: string;

        beforeAll(async () => {
            appId = await setupTestsForDeploymentFrequency(nonPerformingAppName, lastDeploymentTimestamp);
        });

        test('should return elite rating for deployment frequency app', async () => {
            const data = await makeGQLRequestToRetrieveDeploymentFrequency(nonPerformingAppName);

            expect(data.app).toStrictEqual({
                deploymentFrequency: {
                    lastDeploymentTimestamp,
                    rating: 'NONE'
                },
                id: appId,
                name: nonPerformingAppName
            });
        });
    });
});
