// this is for mocking schema on the client side
export const typeDefs = `
  type Query {
    users: [User]
    userById(id: String!): User!
    me: User
  }

  type User {
    id: ID!
    name: String
    email: String
  }

`;
