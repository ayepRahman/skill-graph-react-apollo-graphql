const users = [
  {
    id: 1,
    name: 'Arif',
  },
  {
    id: 2,
    name: 'Amy',
  },
  {
    id: 3,
    name: 'Arysha',
  },
  {
    id: 4,
    name: 'Aqil',
  },
];

let nextId = 10;

export const resolvers = {
  Query: {
    users: () => {
      return users;
    },
  },

  Mutation: {
    addNewUser: (root, args) => {
      const newUser = { id: nextId++, name: args.name };
      users.push(newUser);

      return newUser;
    },
  },
};
