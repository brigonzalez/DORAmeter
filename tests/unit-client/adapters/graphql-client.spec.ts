import {
    ApolloClient,
    HttpLink,
    InMemoryCache
} from '@apollo/client';
import fetch from 'cross-fetch';

import gqlClient from '../../../client/adapters/graphql-client';

jest.mock('@apollo/client', () => ({
    ApolloClient: jest.fn(),
    HttpLink: jest.fn(),
    InMemoryCache: jest.fn()
}));
jest.mock('cross-fetch');

describe('graphql client', () => {
    const GRAPHQL_URI = 'http://localhost:4444/graphql';

    test('should set up apollo client with the right config', () => {
        expect(InMemoryCache).toHaveBeenCalledTimes(1);
        expect(InMemoryCache).toHaveBeenCalledWith();
        expect(HttpLink).toHaveBeenCalledTimes(1);

        expect(HttpLink).toHaveBeenCalledWith({
            fetch,
            uri: GRAPHQL_URI
        });

        const inMemoryCacheResult = new InMemoryCache();
        const httpLinkResult = new HttpLink();

        expect(ApolloClient).toHaveBeenCalledTimes(1);
        expect(ApolloClient).toHaveBeenCalledWith({
            cache: inMemoryCacheResult,
            link: httpLinkResult,
            uri: GRAPHQL_URI
        });
    });

    test('should export an Apollo client', () => {
        // @ts-ignore
        const apolloClientResult = new ApolloClient();

        expect(gqlClient).toStrictEqual(apolloClientResult);
    });
});
