import React, {useEffect, useState} from 'react';
import {gql, ApolloError} from '@apollo/client';

import graphQLClient from '../adapters/graphql-client';

import Error from './Error';
import NoDataFound from './NoDataFound';
import AppData from './AppData';

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
        const getAllApps = () => {
            graphQLClient.query({
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
            }).then(({data: {apps: gqlApps}, loading}) => {
                setApps(gqlApps);
                setIsLoading(loading);
            }).catch((error_) => {
                setIsLoading(false);
                setError(error_ as ApolloError);
            });
        };

        getAllApps();
    }, []);

    return (
        <>
            {
                isLoading as boolean ? // eslint-disable-line no-nested-ternary
                    <div className={'loading-spinner'} /> :
                    error ?
                        <Error /> :
                        <div className={'apps'}>
                            {!apps.length ?
                                <NoDataFound /> :
                                (apps as any[]).map((app) => // eslint-disable-line no-extra-parens
                                    <AppData
                                        app={app}
                                        key={app.id}
                                    />
                                )}
                        </div>
            }
        </>
    );
};

export default Apps;
