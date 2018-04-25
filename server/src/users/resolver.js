import { PubSub, withFilter } from "graphql-subscriptions";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import _ from "lodash";

import query from "./queries";
import mutation from "./mutation";
import subscription from "./subscriptions";

const pubsub = new PubSub();

export const resolvers = {
  Query: query,
  Mutation: mutation,
  Subscription: subscription
};
