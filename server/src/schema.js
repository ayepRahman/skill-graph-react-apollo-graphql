import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers";

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
