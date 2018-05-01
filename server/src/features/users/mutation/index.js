import { PubSub } from "graphql-subscriptions";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import _ from "lodash";

import { tryLogin } from "../../../auth";

const pubsub = new PubSub();

export default {
  register: async (root, args, { User }) => {
    // We get User models by passing in context in Server.js
    let user = args;

    if (!user) throw new Error("User does not exist");

    // hashing user password using bcrypt
    user.password = await bcrypt.hash(user.password, 12);
    user = await new User(user).save();

    user._id = user._id.toString();

    // subscription
    pubsub.publish("userAdded", {
      userAdded: user
    });

    return user;
  },

  login: (parent, { email, password }, { User, SECRET, SECRET_2 }) =>
    tryLogin(email, password, User, SECRET, SECRET_2),

  // login: async (root, { email, password }, { User, SECRET }) => {
  //   const user = await User.where({ email: email });
  //   const userObj = user[0];

  //   if (!userObj) {
  //     throw new Error("No user with that email");
  //   }

  //   // comparing plaintext password with db.user.password
  //   const valid = await bcrypt.compare(password, userObj.password);

  //   if (!valid) {
  //     throw new Error("Incorrect Password La");
  //   }

  //   // verify: need secret | user me for authentication
  //   // decode: no secret | user me on the client side
  //   const token = jwt.sign(
  //     {
  //       user: _.pick(userObj, ["id", "name"])
  //     },
  //     SECRET,
  //     { expiresIn: "1y" }
  //   );

  //   return token;
  // },

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
