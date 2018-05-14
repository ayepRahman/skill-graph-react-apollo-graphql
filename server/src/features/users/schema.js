import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolver";

// TODO: maybe move typedDef base on features

const typeDefs = `
    type User {
      id: ID!
      name: String!
      email: String!
      skills: [Skill] @relation(name: "UserSkills")
    }

    type Skill {
      skill_name: String!
      skill_level: Int!
      users: [User!]! @relation(name: "UserSkills")
    }

    type RegisterResponse {
      ok: Boolean!
      user: User
      errors: [Error!]
    }

    type LoginResponse {
      ok: Boolean!
      token: String
      refreshToken: String
      errors: [Error!]
    }

    type Error {
      path: String
      message: String
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
      register(name: String!, email: String!, password: String! ): RegisterResponse!
      login(email: String!, password: String!): LoginResponse!
      addOneUserSkill(id: ID!): User!
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
