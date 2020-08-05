import {Express} from 'express';
import {ApolloServer} from 'apollo-server-express';

const books = [
    {
        author: 'J.K. Rowling',
        title: "Harry Potter and the Sorcerer's stone"
    },
    {
        author: 'Michael Crichton',
        title: 'Jurassic Park'
    }
];

// The GraphQL schema in string form
const typeDefs = `
    type Query { books: [Book] }
    type Book { title: String, author: String }
  `;

// The resolvers
const resolvers = {
    Query: {books: () => books}
};

export const setGraphQLEndpoint = (app: Express): void => {
    const server = new ApolloServer({
        resolvers,
        typeDefs
    });

    server.applyMiddleware({app});
};
