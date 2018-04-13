import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// Adding MockUp Network Interface for testing
// import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { SchemaLink } from 'apollo-link-schema';
import { typeDefs } from 'schema/schema';

import App from './components/app';

import 'bulma/css/bulma.css';
import 'styles/index.css';

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });

const mockSchemaLink = new SchemaLink({ schema });

const apolloCache = new InMemoryCache(window.__APOLLO_STATE__);

const client = new ApolloClient({
  cache: apolloCache,
  link: mockSchemaLink,
});

// const grapQlApi = process.env.REACT_APP_GRAPHQL_ENDPOINT;
// const httpLink = new HttpLink({
//   uri: `https://api.graph.cool/simple/v1/${grapQlApi}`,
// });

// const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache(),
// });

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
