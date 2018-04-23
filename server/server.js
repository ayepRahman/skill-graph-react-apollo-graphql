import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { createServer } from "http";
import { execute, subscribe } from "graphql";

import { schema } from "./src/schema";
import User from "./src/example-features-structure/model";

// for using .env files
require("dotenv").config();

const CLIENT_PORT = process.env.CLIENT_PORT || 9000;
const SERVER_PORT = process.env.SERVER_PORT || 8000;
const server = express();
const ws = createServer(server);

// mongoose.connect(`mongodb://localhost/test`);
mongoose.connect(`mongodb://localhost:27017`, function(err) {
  if (err) {
    console.log("Not Connected to MongoDB" + err);
  } else {
    console.log("Connected to mongodb://localhost:27017");
  }
});

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
// server.use(cors());

server.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: { User }
  })
);

// using the endpoint from /graphql to connect to /graphiql
server.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql",
    subscriptionsEndpoint: `ws://localhost:${SERVER_PORT}/subscriptions`
  })
);

ws.listen(SERVER_PORT, error => {
  if (error) throw error;
  console.log(
    `GraphQL Server is running on http://localhost:${SERVER_PORT}/graphiql`
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
