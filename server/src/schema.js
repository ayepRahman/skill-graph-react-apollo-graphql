import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
  type User {
    id: ID!
    name: String
  }

  type Query {
    users: [User]
  }

  
  type Mutation {
    addNewUser(name: String!): User
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
// addMockFunctionsToSchema({ schema });

export { schema };
