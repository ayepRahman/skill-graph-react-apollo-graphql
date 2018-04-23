import { PubSub, withFilter } from "graphql-subscriptions";

const pubsub = new PubSub();

export const rootResolvers = {
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

      if (!user) throw new Error("User does not exist");

      user._id = user._id.toString();

      console.log("Mutatation: addUser", user);

      pubsub.publish("userAdded", {
        userAdded: user
      });

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
  },

  Subscription: {
    userAdded: {
      subscribe: () => pubsub.asyncIterator("userAdded")
    }
  }
};
