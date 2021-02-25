import React from 'react';
import {graphql} from 'msw';
import {setupServer} from 'msw/node';
import {render, screen, cleanup} from '@testing-library/react';

import Apps from '../../client/components/Apps';
import graphQLClient from '../../client/adapters/graphql-client';

import '@testing-library/jest-dom/extend-expect';

describe('app metrics', () => {
    const returnedAppData = [{
        __typename: 'App',
        deploymentFrequency: {
            rating: 'ELITE'
        },
        id: '3D094E77-7913-4AE2-9B2B-F3804EDF20B6',
        name: 'App A'
    }, {
        __typename: 'App',
        deploymentFrequency: {
            rating: 'HIGH'
        },
        id: 'C08B4F20-9F07-4CDC-9D88-7B36F58D2210',
        name: 'App B'
    }, {
        __typename: 'App',
        deploymentFrequency: {
            rating: 'MEDIUM'
        },
        id: 'AB5A9775-C3E9-4B8C-829B-51C11300216C',
        name: 'App C'
    }];
    const server = setupServer(
        graphql.query(
            'getAllApps',
            (_, res, ctx) =>
                res(
                    ctx.data({
                        apps: returnedAppData
                    })
                )
        )
    );

    beforeAll(() => server.listen());
    afterEach(() => {
        graphQLClient.resetStore();
        server.resetHandlers();
        cleanup();
    });
    afterAll(() => server.close());

    describe('unsuccessful getAllApps gql request', () => {
        test('should render error page on errors from server', async () => {
            server.use(
                graphql.query(
                    'getAllApps',
                    (_, res, ctx) =>
                        res(
                            ctx.errors([
                                {
                                    message: 'Internal server error'
                                }
                            ])
                        )
                )
            );
            render(<Apps />);

            const errorLogo = await screen.findByAltText('Error logo');
            const errorText = await screen.findByText('Something went wrong. Please try again.');

            // @ts-ignore
            expect(errorLogo).toBeInTheDocument();
            // @ts-ignore
            expect(errorText).toBeInTheDocument();
        });
    });

    describe('successful getAllApps gql request', () => {
        describe('app data is not found', () => {
            test('should render message about not finding data', async () => {
                server.use(
                    graphql.query(
                        'getAllApps',
                        (_, res, ctx) =>
                            res.once(
                                ctx.data({
                                    apps: []
                                })
                            )
                    )
                );
                render(<Apps />);

                const noDataText1 = await screen.findByText('No data found!');
                const noDataText2 = await screen.findByText('Try making a POST request to the `/event` endpoint', {
                    exact: false
                });

                // @ts-ignore
                expect(noDataText1).toBeInTheDocument();
                // @ts-ignore
                expect(noDataText2).toBeInTheDocument();
            });
        });
        describe('app data is found', () => {
            test('should render data and badges for all apps', async () => {
                render(<Apps />);

                for (let i = 0; i < returnedAppData.length; i++) {
                    const app = returnedAppData[i];
                    const appAMetricHeader = await screen.findByText(app.name);
                    const deploymentFrequencyBadge = await screen.findAllByAltText('Deployment Frequency badge');
                    const leadTimeBadge = await screen.findAllByAltText('Lead Time badge');
                    const meanTimeToRestoreServiceBadge = await screen.findAllByAltText('Mean Time to Restore Service badge');
                    const changeFailureBadge = await screen.findAllByAltText('Change Failure badge');

                    // @ts-ignore
                    expect(appAMetricHeader).toBeInTheDocument();
                    // @ts-ignore
                    expect(deploymentFrequencyBadge[i]).toBeInTheDocument();
                    // @ts-ignore
                    expect(leadTimeBadge[i]).toBeInTheDocument();
                    // @ts-ignore
                    expect(meanTimeToRestoreServiceBadge[i]).toBeInTheDocument();
                    // @ts-ignore
                    expect(changeFailureBadge[i]).toBeInTheDocument();
                }
            });
        });
    });
});
