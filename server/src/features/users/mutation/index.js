import { PubSub } from "graphql-subscriptions";
import bcrypt from "bcrypt";

import { tryLogin } from "../../../auth";
import { formatErrors } from "../../../auth/formatErrors";

const pubsub = new PubSub();
const saltRounds = 12;

export default {
  register: async (root, args, { User }) => {
    let user = args;

    try {
      user.password = await bcrypt.hash(user.password, saltRounds);
      user = await new User(user).save();
      user._id = user._id.toString();

      // subscription
      pubsub.publish("userAdded", {
        userAdded: user
      });

      return {
        ok: true,
        user
      };
    } catch (errors) {
      return {
        ok: false,
        errors: formatErrors(errors, User)
      };
    }
  },

  login: (parent, { email, password }, { User, SECRET, SECRET_2 }) =>
    tryLogin(email, password, User, SECRET, SECRET_2),

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
};
