import { PubSub } from "graphql-subscriptions";
import bcrypt from "bcrypt";

import { tryLogin } from "../../../auth";
import { formatErrors } from "../../../auth/formatErrors";

const pubsub = new PubSub();
const saltRounds = 12;

export default {
  register: async (root, args, { models }) => {
    let user = args;

    console.log(models);

    try {
      user.password = await bcrypt.hash(user.password, saltRounds);
      user = await new models.User(user).save();
      user._id = user._id.toString();

      console.log("user", user);

      // subscription
      pubsub.publish("userAdded", {
        userAdded: user
      });

      return {
        ok: true,
        user
      };
    } catch (errors) {
      console.log(errors);

      return {
        ok: false,
        errors: formatErrors(errors, models.User)
      };
    }
  },

  login: (parent, { email, password }, { models, SECRET, SECRET_2 }) =>
    tryLogin(email, password, models, SECRET, SECRET_2),

  addUser: async (root, args, { models }) => {
    const user = await new models.User(args).save();

    if (!user) throw new Error("User does not exist");

    user._id = user._id.toString();

    console.log("Mutatation: addUser", user);

    pubsub.publish("userAdded", {
      userAdded: user
    });

    return user;
  },

  updateUser: async (root, { id, name }, { models }) => {
    const user = await models.User.findById(id);

    user.set({ name: name });
    user.save();

    return user;
  },

  deleteUser: async (root, { id }, { models }) => {
    return models.User.findByIdAndRemove(id);
  },

  addOneUserSkill: async (root, { id, skill }, { models }) => {
    // find user by id, add skill into user collection

    const user = await models.User.findById(id);

    return user;
  }

  // addUserSkills: async (root, args, { models, user }) => {
  //   return [];
  // }
};
