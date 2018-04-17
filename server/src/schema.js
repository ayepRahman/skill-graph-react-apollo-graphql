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
  }

  
  type Mutation {
    addNewUser(name: String!): User
  }

  type Subscription {
    userAdded(userId: ID!): User
  }
`;

// const typeDefs = `
//   type User {
//     id: ID!
//     name: String
//     skill: [Skill]
//   }

//   type Skill {
//     id: ID!
//     name: String
//     level: Int
//   }

//   type Query {
//     users: [User]
//   }

//   type Mutation {
//     addNewUser(name: String!): User
//   }
// `;

const schema = makeExecutableSchema({ typeDefs, resolvers });
// addMockFunctionsToSchema({ schema });

export { schema };
