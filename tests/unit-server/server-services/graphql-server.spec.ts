import {ApolloServer} from 'apollo-server-express';

import resolvers from '../../../server/resolvers';
import typeDefs from '../../../server/type-definitions';
import {registerGraphQL} from '../../../server/server-infra/graphql-server';

jest.mock('apollo-server-express');
jest.mock('../../../server/resolvers');
jest.mock('../../../server/type-definitions');

describe('graphql server', () => {
    describe('registerGraphQL', () => {
        let expectedExpressServer,
            expectedApolloServer;

        beforeEach(() => {
            expectedApolloServer = {
                applyMiddleware: jest.fn()
            };
            (ApolloServer as jest.Mock).mockReturnValue(expectedApolloServer);
        });

        test('should create an ApolloServer', () => {
            registerGraphQL(expectedExpressServer);

            expect(ApolloServer).toHaveBeenCalledTimes(1);
            expect(ApolloServer).toHaveBeenCalledWith({
                resolvers,
                typeDefs
            });
        });

        test('should add express server to the ApolloServer', () => {
            registerGraphQL(expectedExpressServer);

            expect(expectedApolloServer.applyMiddleware).toHaveBeenCalledTimes(1);
            expect(expectedApolloServer.applyMiddleware).toHaveBeenCalledWith({
                app: expectedExpressServer
            });
        });
    });
});
