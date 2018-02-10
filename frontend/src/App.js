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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NotFound from './containers/NotFound'
import logo from './logo.svg';
import './App.css';
import FoldsList from "./containers/FoldsList"
import FoldSingle from "./containers/FoldSingle"
import FoldEdit from './containers/FoldEdit'
import SignUp from "./containers/SignUp"
import Login from "./containers/Login"
import HomeIntro from "./containers/HomeIntro"
import ConfirmUser from "./containers/ConfirmUser"
import {authedFetch} from "./cognito"

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
  link: new HttpLink({
    uri: 'https://7r4nx53sz1.execute-api.us-east-1.amazonaws.com/dev/graphql',
    fetch: authedFetch,
  }),
  cache: new InMemoryCache({
    // dataIdFromObject: o => o.id
  }),
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <MuiThemeProvider>
          <BrowserRouter>
            <div className="App">
              <Link to="/" className="navbar">
                Fold.im
              </Link>
              <Switch>
                <Route exact path="/" component={HomeIntro} />
                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={Login} />
                <Route path="/confirm" component={ConfirmUser} />
                <Route path="/folds" component={FoldsList} />
                <Route path="/fold/:foldId" component={FoldSingle} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </BrowserRouter>
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
