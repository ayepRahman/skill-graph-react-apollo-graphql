import { makeExecutableSchema, mergeSchemas } from "graphql-tools";
import { combineResolvers } from "graphql-resolvers";
import { rootResolvers as resolvers } from "./resolvers";

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
    userAdded: User!
  }


  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;

// example for merging schemas src/root schema!!!
// chripSchema coming from features schema

// export const schema = mergeSchemas({
//   schemas: [chirpSchema, authorSchema],
// });

// exmaple for merging resolvers

const schema = makeExecutableSchema({ typeDefs, resolvers });
// addMockFunctionsToSchema({ schema });

export { schema };
