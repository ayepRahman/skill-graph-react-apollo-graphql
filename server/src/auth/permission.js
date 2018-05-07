const createResolver = resolver => {
  const baseResolver = resolver;
  baseResolver.createResolver = childResolver => {
    const newResolver = async (parent, args, context, info) => {
      await resolver(parent, args, context, info);
      return childResolver(parent, args, context, info);
    };
    return createResolver(newResolver);
  };
  return baseResolver;
};

export const requiresAuth = createResolver((parent, args, { user }) => {
  if (!user || !user.id) {
    throw new Error("Not Authenticated");
  }
});

export const requiresAdmin = requiresAuth.createResolver(
  (parent, args, { user }) => {
    if (!user.isAdmin) {
      throw new Error("Requires admin access");
    }
  }
);
