import { PubSub, withFilter } from "graphql-subscriptions";

const pubsub = new PubSub();

const users = [
  {
    id: 1,
    name: "Arif"
  }
];

let nextId = 5;

export const resolvers = {
  Query: {
    users: () => {
      return users;
    }
  },

  Mutation: {
    addUser: (root, args) => {
      const newUser = { id: nextId++, name: args.name };
      users.push(newUser);

      return newUser;
    }
  }

  // addUser: (root, { message }) => {
  //   const user = users.find(user => user.id === message.userId);

  //   if (!user) throw new Error("User does not exist");

  //   const newUser = { id: String() };
  // }
};
