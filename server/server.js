import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { graphqlExpress, graphiqlExpress } from "graphql-server-express";

import { schema } from "./src/schema";
import User from "./src/example-features-structure/model";

// for using .env files
require("dotenv").config();

const PORT = process.env.PORT || 8000;
const server = express();

// mongoose.connect(`mongodb://localhost/test`);
mongoose.connect(`mongodb://localhost:27017`, function(err) {
  if (err) {
    console.log("Not Connected to MongoDB" + err);
  } else {
    console.log("mongodb://localhost:27017");
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
// server.use("*", cors({ origin: "https://localhost:9000" }));
server.use(cors());

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
    endpointURL: "/graphql"
  })
);

server.listen(PORT, () =>
  console.log(`GraphQL Server is running on http://localhost:${PORT}/graphiql`)
);
