import Chance from 'chance';
import {GraphQLClient, gql} from 'graphql-request';
import sub from 'date-fns/sub';

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

    const setupTestsForDeploymentFrequency = async (
        appName: string,
        lastDeploymentTimestamp: Date | null
    ) => {
        const appId = await insertApp(appName);

        if (lastDeploymentTimestamp) {
            await insertEvent(appId, lastDeploymentTimestamp.toISOString());
        }

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

        return data;
    };

    describe('elite performing deployment frequency app', () => {
        const elitePerformingAppName = chance.word();
        const lastDeploymentTimestamp = sub(new Date(), {
            hours: chance.integer({
                max: 12,
                min: 1
            })
        });

        let appId: string;

        beforeAll(async () => {
            appId = await setupTestsForDeploymentFrequency(elitePerformingAppName, lastDeploymentTimestamp);
        });

        test('should return elite rating for deployment frequency app', async () => {
            const data = await makeGQLRequestToRetrieveDeploymentFrequency(elitePerformingAppName);

            expect(data.app).toStrictEqual({
                deploymentFrequency: {
                    lastDeploymentTimestamp: lastDeploymentTimestamp.toISOString(),
                    rating: 'ELITE'
                },
                id: appId,
                name: elitePerformingAppName
            });
        });
    });

    describe('high performing deployment frequency app', () => {
        const highPerformingAppName = chance.word();
        const chanceDays = chance.d6() + 1;
        const lastDeploymentTimestamp = sub(new Date(), {
            days: chanceDays
        });

        let appId: string;

        beforeAll(async () => {
            appId = await setupTestsForDeploymentFrequency(highPerformingAppName, lastDeploymentTimestamp);
        });

        test('should return elite rating for deployment frequency app', async () => {
            const data = await makeGQLRequestToRetrieveDeploymentFrequency(highPerformingAppName);

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

    describe('medium performing deployment frequency app', () => {
        const mediumPerformingAppName = chance.word();
        const lastDeploymentTimestamp = sub(new Date(), {
            weeks: chance.integer({
                max: 3,
                min: 3
            })
        });

        let appId: string;

        beforeAll(async () => {
            appId = await setupTestsForDeploymentFrequency(mediumPerformingAppName, lastDeploymentTimestamp);
        });

        test('should return elite rating for deployment frequency app', async () => {
            const data = await makeGQLRequestToRetrieveDeploymentFrequency(mediumPerformingAppName);

            expect(data.app).toStrictEqual({
                deploymentFrequency: {
                    lastDeploymentTimestamp: lastDeploymentTimestamp.toISOString(),
                    rating: 'MEDIUM'
                },
                id: appId,
                name: mediumPerformingAppName
            });
        });
    });

    describe('low performing deployment frequency app', () => {
        const lowPerformingAppName = chance.word();
        const lastDeploymentTimestamp = sub(new Date(), {
            months: chance.d4()
        });

        let appId: string;

        beforeAll(async () => {
            appId = await setupTestsForDeploymentFrequency(lowPerformingAppName, lastDeploymentTimestamp);
        });

        test('should return elite rating for deployment frequency app', async () => {
            const data = await makeGQLRequestToRetrieveDeploymentFrequency(lowPerformingAppName);

            expect(data.app).toStrictEqual({
                deploymentFrequency: {
                    lastDeploymentTimestamp: lastDeploymentTimestamp.toISOString(),
                    rating: 'LOW'
                },
                id: appId,
                name: lowPerformingAppName
            });
        });
    });

    describe('nonperforming deployment frequency app', () => {
        describe('deployment event is added for the app', () => {
            const nonPerformingAppName = chance.word();
            const lastDeploymentTimestamp = sub(new Date(), {
                years: chance.d4()
            });

            let appId: string;

            beforeAll(async () => {
                appId = await setupTestsForDeploymentFrequency(nonPerformingAppName, lastDeploymentTimestamp);
            });

            test('should return elite rating for deployment frequency app', async () => {
                const data = await makeGQLRequestToRetrieveDeploymentFrequency(nonPerformingAppName);

                expect(data.app).toStrictEqual({
                    deploymentFrequency: {
                        lastDeploymentTimestamp: lastDeploymentTimestamp.toISOString(),
                        rating: 'NONE'
                    },
                    id: appId,
                    name: nonPerformingAppName
                });
            });
        });

        describe('deployment event is not added for the app', () => {
            const nonPerformingAppName = chance.word();
            const lastDeploymentTimestamp = new Date(1969, 12, 28);

            let appId: string;

            beforeAll(async () => {
                appId = await setupTestsForDeploymentFrequency(nonPerformingAppName, lastDeploymentTimestamp);
            });

            test('should return elite rating for deployment frequency app', async () => {
                const data = await makeGQLRequestToRetrieveDeploymentFrequency(nonPerformingAppName);

                expect(data.app).toStrictEqual({
                    deploymentFrequency: {
                        lastDeploymentTimestamp: lastDeploymentTimestamp.toISOString(),
                        rating: 'NONE'
                    },
                    id: appId,
                    name: nonPerformingAppName
                });
            });
        });
    });
});
