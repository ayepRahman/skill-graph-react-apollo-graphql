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
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
    userById(id: String!): User!
    me: User!
  }

  
  type Mutation {
    addUser(name: String!): User
    updateUser(id: ID! name: String): User
    deleteUser(id: ID!): User
    register(name: String!, email: String!, password: String! ): User!
    login(email: String!, password: String!): String!
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
