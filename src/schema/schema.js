export const typeDefs = `
  type Query {
    users: [User]
  }

  type User {
    id: ID!
    name: String
  }

`;

// export const typeDefs = `
//   type Query {
//     users: [User]
//   }

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
// `;
