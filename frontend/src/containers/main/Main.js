import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'
import FoldsList from "./FoldsList"
import FoldSingle from "./FoldSingle"
import FoldsByTag from "./FoldsByTag"
import NavBar from "./NavBar"


const Main = (props) => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/fold/:foldId" component={FoldSingle} />
        <Route path="/tag/:tag" component={FoldsByTag} />
        <Route component={FoldsList} />
      </Switch>
    </div>
  )
}

Main.propTypes = {}

export default Main