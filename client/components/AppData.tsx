import React from 'react';

import AppMetricDetail from './AppMetricDetail';

const AppData = ({app}: {
    app: {
        id: string,
        name: string,
        deploymentFrequency: {
            rating: string
        }
    }
}) =>
    <div
        className={'app-metric-details'}
    >
        <p className={'app-metric-details-header'}>{app.name}</p>
        <AppMetricDetail
            metric={'DF'}
            rating={app.deploymentFrequency.rating}
        />
        <AppMetricDetail
            metric={'LT'}
            rating={'NONE'}
        />
        <AppMetricDetail
            metric={'MTTR'}
            rating={'NONE'}
        />
        <AppMetricDetail
            metric={'CF'}
            rating={'NONE'}
        />
    </div>;

export default AppData;
