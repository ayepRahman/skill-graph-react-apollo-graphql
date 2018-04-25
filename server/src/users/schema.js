import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolver";

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

export const schema = makeExecutableSchema({ typeDefs, resolvers });
