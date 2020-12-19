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
                <div key={app.id}>
                    <p>{app.name}</p>
                </div>
            )}
        </div>
    );
};

export default AppDetails;
