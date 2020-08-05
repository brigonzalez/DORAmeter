import {Express} from 'express';
import {ApolloServer} from 'apollo-server-express';

const teams = [
    {
        id: '98191948-0D9C-4153-9A2C-4E86E76A3A53',
        title: 'team a'
    },
    {
        id: '4C629655-A41B-4295-911D-0B24D8775749',
        title: 'team b'
    }
];

const typeDefs = `
    type Query { teams: [Team] }
    type Team { id: ID, name: String }
  `;

const resolvers = {
    Query: {teams: () => teams}
};

export const registerGraphQL = (app: Express): void => {
    const server = new ApolloServer({
        resolvers,
        typeDefs
    });

    server.applyMiddleware({app});
};
