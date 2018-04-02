import React, { Component } from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Amplify, {Auth} from 'aws-amplify'
import config from './config'
import 'normalize.css';
import './App.css';
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import {SESSION_LOADING, NOT_LOGGED_IN} from './helpers/constants'
import Loading from './components/Loading'
import Authorizer from './containers/Authorizer'
import NavBar from './containers/NavBar'

// Configure AWS Cognito
Amplify.configure({Auth: config.Auth})

// Setup GraphQL Client
const client = new ApolloClient({
  uri: config.gqlEndpoint,
  request: async (operation) => {
    const session = await Auth.currentSession()
    console.log(session)
    operation.setContext({
      headers: {
        authorization: session.idToken.jwtToken,
      }
    })
  }
})

class App extends Component {

  state = {
    session: SESSION_LOADING,
    filterTerms: [],
  }

  setSession = (session) => this.setState({session})
  setFilter = (filterTerms) => this.setState({filterTerms})

  componentDidMount() {
    Auth.currentSession()
      .then(session => this.setSession(session))
      .catch(e => this.setSession(NOT_LOGGED_IN))
  }

  render() {
    const { session, filterTerms } = this.state

    if(session === SESSION_LOADING) return (
      <Loading/>
    )

    if(session === NOT_LOGGED_IN) return (
      <Authorizer setSession={this.setSession}/>
    )
    
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div id="App">
            <NavBar
              session={session}
              setSession={this.setSession}
              filterTerms={filterTerms}
              setFilter={this.setFilter}
            />
            <Switch>
              <Route path="/" render={props => <Home {...{session, filterTerms}} {...props}/>}/>
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
