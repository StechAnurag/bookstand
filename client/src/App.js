import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import BookList from './components/BookList';
import AddBook from './components/AddBook';

// apollo client setup
const client = new ApolloClient({
  uri : 'http://localhost:4000/graphql'
});

class App extends Component {
  render(){
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Welcome to Book-Stand</h1>
          {/* <p><i>One stop for your daily need books</i></p> */}
          <BookList></BookList>
          <AddBook></AddBook>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
