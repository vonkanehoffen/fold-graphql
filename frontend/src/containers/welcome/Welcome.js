import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link, Route, Switch } from 'react-router-dom'
import Intro from './Intro'
import SignUp from './SignUp'
import Login from './Login'
import ConfirmUser from "./ConfirmUser"


const Home = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
`

const Welcome = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.url}/signup`} component={SignUp}/>
      <Route path={`${match.url}/login`} component={Login}/>
      <Route path={`${match.url}/confirm`} component={ConfirmUser} />
      <Route component={Intro}/>
    </Switch>
  )
}

Welcome.propTypes = {}

export default Welcome