import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import path from "path";
import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { schema } from "./src/features/rootSchema";
import { models } from "./src/features/rootModels";
import { refreshTokens } from "./src/auth";

// for using .env files
require("dotenv").config();

const CLIENT_PORT = process.env.REACT_APP_CLIENT_PORT || 9000;
const SERVER_PORT = process.env.REACT_APP_SERVER_PORT || 8000;
const SECRET = process.env.SECRET || "s3cr3t";
const SECRET_2 = process.env.SECRET_2 || "s3cr3t2";

const server = express();
const ws = createServer(server);

// get user from headers
const getUserFromHeaders = async (req, res, next) => {
  const token = req.headers["x-token"];
  console.log(`TOKEN: ${token}`);

  if (token) {
    try {
      // verify token with secret
      const { user } = jwt.verify(token, SECRET);
      req.user = JSON.stringify(user);
      console.log(`VERIFIED USER: ${req.user}`);
    } catch (error) {
      console.log("getUserFromHeaders", error);
      const refreshToken = req.headers["x-refresh-token"];
      const newTokens = await refreshTokens(
        token,
        refreshToken,
        models,
        SECRET,
        SECRET_2
      );

      console.log("newTokens", newTokens);

      if (newTokens.token && newTokens.refreshToken) {
        res.set("Access-Control-Expose-Headers", "x-token", "x-refresh-token");
        res.set("x-token", newTokens.token);
        res.set("x-refresh-token", newTokens.refreshToken);
      }

      console.log(`newTokens User: ${newTokens.user}`);

      req.user = newTokens.user;
    }
  }

  next();
};

// mongoose.connect(`mongodb://localhost/test`);
mongoose.connect(`mongodb://localhost:27017/skill_graph_db`, function(err) {
  if (err) {
    console.log("Not Connected to MongoDB" + err);
  } else {
    console.log("Connected to mongodb://localhost:27017/skill_graph_db");
  }
});

// TODO: connecting to mlab actual DB
// mongoose.connect(
//   `mongodb://${process.env.DB_USER}:${
//     process.env.DB_PASSWORD
//   }@ds149279.mlab.com:49279/arif_rahman_db`,
//   function(err) {
//     if (err) {
//       console.log("Note Connected to MongoDB" + err);
//     } else {
//       console.log("Connected to MongoDB");
//     }
//   }
// );

// connecting server to client
server.use("*", cors({ origin: `http://localhost:${CLIENT_PORT}` }));
server.use(getUserFromHeaders);
server.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: {
      models,
      SECRET,
      SECRET_2,
      userFromHeader: req.user
    }
  }))
);

// using the endpoint from /graphql to connect to /graphiql
server.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql",
    subscriptionsEndpoint: `ws://localhost:${SERVER_PORT}/subscriptions`
  })
);

// letting client handle not found route
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

ws.listen(SERVER_PORT, error => {
  if (error) throw error;

  console.log(
    `GraphQL Server is running on http://localhost:${SERVER_PORT}/graphql`
  );

  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema
    },
    {
      server: ws,
      path: `/subscriptions`
    }
  );
});
