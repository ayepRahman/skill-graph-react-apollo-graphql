import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

export default {
  userAdded: {
    subscribe: () => pubsub.asyncIterator("userAdded")
  }
};
