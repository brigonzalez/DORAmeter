import {Express} from 'express';
import {ApolloServer, IResolvers} from 'apollo-server-express';

import resolvers from '../resolvers';
import typeDefs from '../type-definitions';

export const registerGraphQL = (app: Express): void => {
    const server = new ApolloServer({
        resolvers: <IResolvers> resolvers,
        typeDefs
    });

    server.applyMiddleware({app});
};
