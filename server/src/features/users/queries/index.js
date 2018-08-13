export default {
  users: async (root, args, { models }) => {
    const users = await models.User.find();

    return users.map(user => {
      user._id = user._id.toString();

      return user;
    });
  },
  userById: async (root, args, { models }) => {
    const user = await models.User.findById(args.id);

    return user;
  },
  me: async (root, args, { models, userFromHeader }) => {
    if (userFromHeader) {
      const users = await models.User.findById(userFromHeader.id);

      console.log("Users", users);

      return users;
    }

    return null;
  },
  getUserSkillSets: async (root, args, { models, userFromHeader }) => {
    if (userFromHeader) {
      const parseUser = JSON.parse(userFromHeader);
      const user = await models.User.findById(parseUser._id);
      console.log("getUserSkillSets", user.skillSets);

      return user.skillSets;
    } else {
      throw new Error("Not Authorized!");
    }
  }
};
