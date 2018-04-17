import { PubSub, withFilter } from "graphql-subscriptions";

const pubsub = new PubSub();

const users = [
  {
    id: 1,
    name: "Arif"
  },
  {
    id: 2,
    name: "Amy"
  },
  {
    id: 3,
    name: "Arysha"
  },
  {
    id: 4,
    name: "Aqil"
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
    addNewUser: (root, args) => {
      const newUser = { id: nextId++, name: args.name };
      users.push(newUser);

      return newUser;
    }
  },

  addUser: (root, { message }) => {
    const user = users.find(user => user.id === message.userId);

    if (!user) throw new Error("User does not exist");

    const newUser = { id: String() };
  }
};
