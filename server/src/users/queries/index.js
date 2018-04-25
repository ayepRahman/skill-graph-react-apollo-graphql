export default {
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
  },
  me: async (root, args, { User, user }) => {
    if (user) {
      const users = await User.findById(user.id);

      console.log("Users", users);

      debugger;
      return users;
    }

    return null;
  }
};
