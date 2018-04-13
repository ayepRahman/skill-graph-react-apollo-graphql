export const typeDefs = `
  type User {
    id: ID!
    name: String
  }

  type Query {
    users: [User]
  }
`;
