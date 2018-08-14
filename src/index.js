import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { ApolloLink, concat } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";

import App from "./components/app/routes";
import "bulma/css/bulma.css";
import "styles/index.css";

// Connecting Server
const grapQlApi = process.env.REACT_APP_SERVER_GRAPHQL_ENDPOINT;
const httpLink = new HttpLink({
  uri: grapQlApi
});

const middlewareLink = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      "x-token": localStorage.getItem("token") || null,
      "x-refresh-token": localStorage.getItem("refreshToken") || null,
      test: "TEST"
    }
  });

  return forward(operation);
});

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const {
      response: { headers }
    } = operation.getContext();
    if (headers) {
      const token = headers.get("x-token");
      const refreshToken = headers.get("x-refresh-token");

      if (token) {
        localStorage.setItem("token", token);
      }

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }
    }

    return response;
  });
});

// Connecting to WebSocket
const wsLink = new WebSocketLink({
  uri: `ws://localhost:8000/subscriptions`,
  options: {
    reconnect: true,
    connectionParams: {
      token: localStorage.getItem("token"),
      refreshToken: localStorage.getItem("refreshToken")
    }
  }
});

// Linking httpLink, middlewareLink and afterwareLink
const httpLinkWithMiddleware = afterwareLink.concat(
  middlewareLink.concat(httpLink)
);

// Split Link to depending on the operationis being sent
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLinkWithMiddleware
);

const apolloCache = new InMemoryCache(window.__APOLLO_STATE__);

const client = new ApolloClient({
  link,
  cache: apolloCache
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
