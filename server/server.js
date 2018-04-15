import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { schema } from './src/schema';

const PORT = 8000;
const server = express();

// connecting server to client
server.use('*', cors({ origin: 'https://localhost:9000' }));


server.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema,
  })
);

// using the endpoint from /graphql to connect to /graphiql
server.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  })
);

server.listen(PORT, () =>
  console.log(`GraphQL Server is running on http://localhost:${PORT}/graphiql`)
);
