import {
    ApolloClient,
    NormalizedCacheObject,
    InMemoryCache,
    HttpLink
} from '@apollo/client';
import fetch from 'cross-fetch';

const GRAPHQL_URI = 'http://localhost:4444/graphql';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        fetch,
        uri: GRAPHQL_URI
    }),
    uri: GRAPHQL_URI
});

export default client;
