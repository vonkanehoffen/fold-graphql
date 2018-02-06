import React, { Component } from 'react';
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import { ApolloClient } from 'apollo-client'
import { ApolloProvider, graphql } from 'react-apollo'
import { toIdValue } from 'apollo-utilities'
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import NotFound from './components/NotFound'
import logo from './logo.svg';
import './App.css';
import FoldsList from "./components/FoldsList"
import FoldSingle from "./components/FoldSingle"

// function dataIdFromObject (result) {
//   if (result.__typename) {
//     if (result.id !== undefined) {
//       return `${result.__typename}:${result.id}`;
//     }
//   }
//   return null;
// }

// const cache = new InMemoryCache({
//   dataIdFromObject,
//   cacheResolvers: {
//     Query: {
//       fold: (_, args) => {
//         return toIdValue(dataIdFromObject({ __typename: 'Fold', id: args['id'] }))
//       },
//     },
//   },
// })

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://7r4nx53sz1.execute-api.us-east-1.amazonaws.com/dev/graphql' }),
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div className="App">
            <Link to="/" className="navbar">
              Fold.im
            </Link>
            <Switch>
              <Route exact path="/" component={FoldsList} />
              <Route path="/fold/:foldId" component={FoldSingle} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
