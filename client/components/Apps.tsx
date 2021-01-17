import React, {useEffect, useState} from 'react';
import {gql, ApolloError} from '@apollo/client';

import graphQLClient from '../adapters/graphql-client';
// @ts-ignore
import Error from '../assets/Error.svg';

import AppMetricDetail from './AppMetricDetail';

const Apps = () => {
    const [apps, setApps] = useState<{
        id: string,
        name: string,
        deploymentFrequency: {
            rating: string
        }
    }[] | []>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<ApolloError | null>(null);

    useEffect(() => {
        const getAllApps = async () => {
            const {data: {apps: gqlApps}, loading, error: queryError} = await graphQLClient.query({
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

            setError(queryError as ApolloError);
            setIsLoading(loading);
            setApps(gqlApps);
        };

        getAllApps();
    }, []);

    return (
        <>
            {
                isLoading as boolean ? // eslint-disable-line no-nested-ternary
                    <div className={'loading-spinner'} /> :
                    error ?
                        <div className={'error'}>
                            <img
                                alt={'Error logo'}
                                className={'error-logo'}
                                src={Error}
                            />
                            <p>{'Something went wrong. Please try again.'}</p>
                        </div> :
                        <div className={'apps'}>
                            {(apps as any[]).map((app) => // eslint-disable-line no-extra-parens
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
            }
        </>
    );
};

export default Apps;
