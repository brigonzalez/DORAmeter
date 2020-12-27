import React from 'react';
import {graphql} from 'msw';
import {setupServer} from 'msw/node';
import {render, screen} from '@testing-library/react';

import Apps from '../../client/components/Apps';

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
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('renders data and badges for all apps', async () => {
        render(<Apps />);

        for (let i = 0; i < returnedAppData.length; i++) {
            const app = returnedAppData[i];
            const appAMetricHeader = await screen.findByText(app.name);
            const deploymentFrequencyBadge = await screen.findAllByAltText('Deployment Frequency badge');
            const leadTimeBadge = await screen.findAllByAltText('Lead Time badge');
            const meanTimeToRestoreServiceBadge = await screen.findAllByAltText('Mean Time to Restore Service badge');
            const changeFailureBadge = await screen.findAllByAltText('Change Failure badge');

            expect(appAMetricHeader).toBeInTheDocument();
            expect(deploymentFrequencyBadge[i]).toBeInTheDocument();
            expect(leadTimeBadge[i]).toBeInTheDocument();
            expect(meanTimeToRestoreServiceBadge[i]).toBeInTheDocument();
            expect(changeFailureBadge[i]).toBeInTheDocument();
        }
    });
});
