import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

// ApolloProvider: a React component that provides data to other components
// ApolloClient: a constructor that will help initialize the connection to thr GraphQL API 
// InMemoryCache: enables the Apollo client to cache API response so request can be performed more efficiently
// createHttpLink: lets us control how Apollo client makes a request. 
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  // uri = uniform resource identifier
  uri: '/graphql'
})

// instantiate the Apollo client
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='flex-column justify-flex-start min-100-vh'>
        <Header />
        <div className='container'>
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
