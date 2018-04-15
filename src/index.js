import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

/*
  # Adding MockUp Network Interface for testing
  # import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils'
  # apollo-test-utils depreciated since apollo client 2.0 using apollo-link-schema instead
*/

import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { SchemaLink } from 'apollo-link-schema';
import { typeDefs } from 'schema/schema';

import App from './components/app';

import 'bulma/css/bulma.css';
import 'styles/index.css';

// this for setting up mockup data
const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });
const mockSchemaLink = new SchemaLink({ schema });

// this is for connecting to localhost server
const httpLink = new HttpLink({
  uri: `http://localhost:8000/graphql`,
});

const apolloCache = new InMemoryCache(window.__APOLLO_STATE__);

const client = new ApolloClient({
  link: httpLink,
  cache: apolloCache,
});

// const grapQlApi = process.env.REACT_APP_GRAPHQL_ENDPOINT;
// const httpLink = new HttpLink({
//   uri: `https://api.graph.cool/simple/v1/${grapQlApi}`,
// });

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
