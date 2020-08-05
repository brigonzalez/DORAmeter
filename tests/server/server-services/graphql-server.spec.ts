import {ApolloServer} from 'apollo-server-express';

import {registerGraphQL} from '../../../server/server-services/graphql-server';

jest.mock('apollo-server-express');

describe('graphql server', () => {
    describe('registerGraphQL', () => {
        let expressServer;

        test('should create an ApolloServer', () => {
            registerGraphQL(expressServer);

            expect(ApolloServer).toHaveBeenCalledTimes(1);
            // expect(ApolloServer).toHaveBeenCalledWith({

            // });
        });
    });
});
