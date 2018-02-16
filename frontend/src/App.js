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
import 'normalize.css';
import './App.css';
import FoldEdit from './containers/FoldEdit'
import Main from './containers/main/Main'
import SignUp from "./containers/welcome/SignUp"
import Login from "./containers/welcome/Login"
import Welcome from "./containers/welcome/Welcome"
import ConfirmUser from "./containers/welcome/ConfirmUser"
import {authedFetch} from "./cognito"

function dataIdFromObject (result) {
  if (result.__typename) {
    if (result.id !== undefined) {
      return `${result.__typename}:${result.id}`;
    }
  }
  return null;
}

const cache = new InMemoryCache({
  dataIdFromObject,
  cacheResolvers: {
    Query: {
      fold: (_, args) => {
        return toIdValue(dataIdFromObject({ __typename: 'Fold', id: args['id'] }))
      },
    },
  },
})

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://7r4nx53sz1.execute-api.us-east-1.amazonaws.com/dev/graphql',
    fetch: authedFetch,
  }),
  cache,
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <MuiThemeProvider>
          <BrowserRouter>
            <div className="App">
              <Switch>
                <Route path="/welcome" component={Welcome} />{/* Intro, Sign up & Login*/}
                <Route path="/" component={Main} />{/* Logged in users */}
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
