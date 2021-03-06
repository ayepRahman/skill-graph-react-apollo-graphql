import { PubSub } from "graphql-subscriptions";
import bcrypt from "bcrypt";

import { tryLogin } from "../../../auth";
import { formatErrors } from "../../../auth/formatErrors";

const pubsub = new PubSub();
const saltRounds = 12;

export default {
  register: async (root, args, { models }) => {
    let user = args;

    try {
      user.password = await bcrypt.hash(user.password, saltRounds);
      user = await new models.User(user).save();
      user._id = user._id.toString();

      console.log("register successfully", user);

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

  addUserSkill: async (root, { skillName, skillLevel }, { models, user }) => {
    user = JSON.parse(user);

    if (!user) throw new Error("User is not log in");

    try {
      const User = await models.User.findById(user._id);
      User.set({ skills: { skillName, skillLevel } });
      User.save();

      console.log("AddUserSkill successfully", User.skills);

      return User.skills;
    } catch (error) {
      throw new Error(error);
    }
  },

  addUserSkillSets: async (root, { skillSets }, { models, userFromHeader }) => {
    let User;

    skillSets.map(data => {
      if (!data.skillName) {
        throw new Error("No empty skill name");
      }

      return [];
    });
    console.log("SKILL SETS", skillSets);

    try {
      const parseUser = JSON.parse(userFromHeader);
      await models.User.update({ _id: parseUser._id }, { skillSets });
      User = await models.User.findById({ _id: parseUser._id });
      const userSkillSets = User.skillSets;

      console.log("USER ADDUSERSKILLS", User);
      console.log("YES userSkillSets", userSkillSets);

      return userSkillSets;
    } catch (error) {
      throw new Error(error);
    }
  }
};
