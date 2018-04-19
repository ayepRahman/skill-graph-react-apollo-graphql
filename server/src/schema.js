import { makeExecutableSchema, mergeSchemas } from "graphql-tools";
import { combineResolvers } from "graphql-resolvers";
import { resolvers } from "./resolvers";

// example for merging schemas
// export const schema = mergeSchemas({
//   schemas: [chirpSchema, authorSchema],
// });

// exmaple for merging resolvers

const typeDefs = `
  type User {
    id: ID!
    name: String
  }

  type Query {
    users: [User]
    userById(id: String!): User
  }

  
  type Mutation {
    addUser(name: String!): User
    updateUser(id: ID! name: String): User
    deleteUser(id: ID!): User
  }

  type Subscription {
    userAdded(userId: ID!): User
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
// addMockFunctionsToSchema({ schema });

export { schema };
