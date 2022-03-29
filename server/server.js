const express = require('express');

const path = require('path');

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

// if were running the code within a development environment, serve any files from the app's build directory
if (process.env.NODE_ENV !== 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))
}

// if a get request was made to any location, redirect to the production-ready front-end code
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
