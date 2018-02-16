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
    session: {},
  }

  async componentDidMount() {
    let session
    try {
      session = await getUserSession()
    } catch(e) {
      session = false
    }
    this.setState({ session })
  }

  doSignOut = () => {
    signOut()
    this.setState({ session: false })
  }

  render() {
    const { session } = this.state

    if(session === false) return <Redirect to="/welcome"/>

    return (
      <div>
        <NavBar session={session} doSignOut={this.doSignOut}/>
        <Switch>
          <Route path="/fold/:foldId" component={FoldSingle} />
          <Route path="/tag/:tag" component={FoldsByTag} />
          <Route component={FoldsList} />
        </Switch>
      </div>
    )
  }
}

Main.propTypes = {}

export default Main