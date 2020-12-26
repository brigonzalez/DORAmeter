import React, {useEffect, useState} from 'react';
import {gql} from '@apollo/client';

import graphQLClient from '../adapters/graphql-client';

import AppMetricDetail from './AppMetricDetail';

const Apps = () => {
    const [apps, setApps] = useState([]);

    useEffect(() => {
        const getAllApps = async () => {
            const {data: {apps: gqlApps}} = await graphQLClient.query({
                query: gql`
                    query getAllApps {
                        apps {
                            id
                            name
                            deploymentFrequency {
                                rating
                            }
                        }
                    }
                `
            });

            setApps(gqlApps);
        };

        getAllApps();
    }, []);

    return (
        <div className={'apps'}>
            {apps.map((app) =>
                <div
                    className={'app-metric-details'}
                    key={app.id}
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
                </div>
            )}
        </div>
    );
};

export default Apps;
