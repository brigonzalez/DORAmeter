import React, {useEffect, useState} from 'react';
import {gql} from '@apollo/client';

import graphQLClient from '../adapters/graphql-client';

const AppDetails = () => {
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
                                lastDeploymentTimestamp
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
        <div className={'app-details'}>
            {apps.map((app) =>
                <div key={app.id} className={'app-metrics'}>
                    <p>{app.name}</p>
                    <div>{`Deployment Frequency: ${app.deploymentFrequency.rating}`}</div>
                    <div>{'Lead Time: NONE'}</div>
                    <div>{'Mean Time To Restore Service: NONE'}</div>
                    <div>{'Change Failure: NONE'}</div>
                </div>
            )}
        </div>
    );
};

export default AppDetails;
