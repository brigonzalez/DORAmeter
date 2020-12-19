import {
    ApolloClient,
    NormalizedCacheObject,
    InMemoryCache,
    HttpLink
} from '@apollo/client';
import fetch from 'cross-fetch';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        fetch,
        uri: 'http://localhost:4444/graphql'
    }),
    uri: 'http://localhost:4444/graphql'
});

export default client;
