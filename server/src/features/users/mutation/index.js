import { PubSub } from "graphql-subscriptions";
import bcrypt from "bcrypt";

import { tryLogin } from "../../../auth";
import { validate } from "../../../auth/validate";

const pubsub = new PubSub();

export default {
  register: async (root, args, { User }) => {
    // We get User models by passing in context in Server.js
    let user = args;

    if (!user) {
      return {
        ok: false,
        errors: [
          {
            path: "register",
            message: "User does not exist"
          }
        ]
      };
    }

    if (user.name.length < 5 || user.name.length > 20) {
      return {
        ok: false,
        errors: [
          {
            path: "name",
            message: "username must in between 5 to 20 characters"
          }
        ]
      };
    }

    if (!validate(user.email)) {
      return {
        ok: false,
        errors: [
          {
            path: "email",
            message: "invalid email address"
          }
        ]
      };
    }

    if (user.password.length < 5 || user.password.length > 50) {
      return {
        ok: false,
        errors: [
          {
            path: "password",
            message: "password must in between 5 to 50 characters"
          }
        ]
      };
    }
    // hashing user password using bcrypt
    user.password = await bcrypt.hash(user.password, 12);
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
