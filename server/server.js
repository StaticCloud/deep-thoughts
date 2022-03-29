const express = require('express');

// import apolloserver
const { ApolloServer } = require('apollo-server-express');

// import typedefs and resolvers
const { typeDefs, resolvers } = require('./schemas')
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const { authMiddleware } = require('./utils/auth');

const startServer = async () => {
  // create a new apollo server with our typedefs and resolvers
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // ensures every request performs an auth check
    // 21.2.5 The updated me()...
    context: authMiddleware
  });

  // start the server
  await server.start();

  // use our apollo server with our express app as middleware
  server.applyMiddleware({ app });

  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
}

// init the apollo server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
