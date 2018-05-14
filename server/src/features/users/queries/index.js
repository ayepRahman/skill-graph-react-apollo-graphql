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
  me: async (root, args, { models, user }) => {
    if (user) {
      const users = await models.User.findById(user.id);

      console.log("Users", users);

      return users;
    }

    return null;
  }
};
