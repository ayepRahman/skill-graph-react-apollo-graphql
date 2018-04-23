import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";

/*
  # Adding MockUp Network Interface for testing
  # import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils'
  # apollo-test-utils depreciated since apollo client 2.0 using apollo-link-schema instead
*/

// import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
// import { SchemaLink } from "apollo-link-schema";
// import { typeDefs } from "schema/schema";

import App from "./components/app";

import "bulma/css/bulma.css";
import "styles/index.css";

// this for setting up mockup data
// const schema = makeExecutableSchema({ typeDefs });
// addMockFunctionsToSchema({ schema });
// const mockSchemaLink = new SchemaLink({ schema });

// Connecting Server
const httpLink = new HttpLink({
  uri: `http://localhost:8000/graphql`
});

// Connecting to WebSocket
const wsLink = new WebSocketLink({
  uri: `ws://localhost:8000/subscriptions`,
  options: {
    reconnect: true
  }
});

// Split Link to depending on the operationis being sent
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);

    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const apolloCache = new InMemoryCache(window.__APOLLO_STATE__);

const client = new ApolloClient({
  link: link,
  cache: apolloCache
});

// const grapQlApi = process.env.REACT_APP_GRAPHQL_ENDPOINT;
// const httpLink = new HttpLink({
//   uri: `https://api.graph.cool/simple/v1/${grapQlApi}`,
// });

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
