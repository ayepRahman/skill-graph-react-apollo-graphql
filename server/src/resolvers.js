import { PubSub, withFilter } from "graphql-subscriptions";

const pubsub = new PubSub();

export const resolvers = {
  Query: {
    users: async (root, args, { User }) => {
      const users = await User.find();

      return users.map(user => {
        user._id = user._id.toString();

        return user;
      });
    },
    userById: async (root, args, { User }) => {
      const user = await User.findById(args.id);

      return user;
    }
  },

  Mutation: {
    addUser: async (root, args, { User }) => {
      const user = await new User(args).save();
      user._id = user._id.toString();

      return user;
    },

    updateUser: async (root, { id, name }, { User }) => {
      const user = await User.findById(id);

      user.set({ name: name });
      user.save();

      return user;
    },

    deleteUser: async (root, { id }, { User }) => {
      return User.findByIdAndRemove(id);
    }
  }

  // addUser: (root, { message }) => {
  //   const user = users.find(user => user.id === message.userId);

  //   if (!user) throw new Error("User does not exist");

  //   const newUser = { id: String() };
  // }
};
