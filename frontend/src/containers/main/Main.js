import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import FoldsList from "./FoldsList"
import FoldSingle from "./FoldSingle"
import FoldsByTag from "./FoldsByTag"
import NavBar from "./NavBar"
import { getUserSession, signOut } from '../../cognito'

class Main extends Component {

  state = {
    loading: true,
    session: {},
  }

  async componentDidMount() {
    let session
    try {
      session = await getUserSession()
    } catch(e) {
      session = false
    }
    this.setState({ session, loading: false })
  }

  doSignOut = () => {
    signOut()
    this.setState({ session: false })
  }

  render() {
    const { session, loading } = this.state

    if(loading) return <p>Loading...</p>

    if(session === false) return <Redirect to="/welcome"/>

    return (
      <div>
        <NavBar session={session} doSignOut={this.doSignOut}/>
        <Switch>
          <Route path="/fold/:foldId" render={props => <FoldSingle {...{session}} {...props}/>}/>
          <Route path="/tag/:tag" render={props => <FoldsByTag {...{session}} {...props}/>}/>
          <Route render={props => <FoldsList {...{session}} {...props}/>}/>
        </Switch>
      </div>
    )
  }
}

Main.propTypes = {}

export default Main