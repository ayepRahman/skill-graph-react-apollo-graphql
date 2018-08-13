import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolver";

// TODO: maybe move typedDef base on features
// skillSets: [Skill] @relation(name: "UserSkillSets")
// type User {
//   id: ID!
//   name: String!
//   email: String!
//   skillSets: [Skill] @relation(name: "UserSkillSets")
// }

// type Skill {
//   skillName: String!
//   skillLevel: Int!
//   user: [User] @relation(name: "UserSkillSets")
//   errors: [Error!]
// }

const typeDefs = `
    type User {
      id: ID!
      name: String!
      email: String!
      skillSets: [Skill] 
    }
    
    type Skill {
      skillName: String!
      skillLevel: Int!
    }

    input SkillOption {
      skillName: String!
      skillLevel: Int!
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
      getUserSkillSets: [Skill]
    }

    type Mutation {
      addUser(name: String!): User
      updateUser(id: ID! name: String): User
      deleteUser(id: ID!): User
      register(name: String!, email: String!, password: String! ): RegisterResponse!
      login(email: String!, password: String!): LoginResponse!
      addUserSkill(skillName: String!, skillLevel: Int!): [Skill]
      addUserSkillSets(skillSets: [SkillOption]): [Skill]
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
