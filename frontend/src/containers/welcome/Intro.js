import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import logo from '../../images/foldLogo@2x.png'
import ButtonLink from '../../components/ButtonLink'

const Intro = (props) => {
  return (
    <div>
      <img src={logo} alt="Fold.im" width={300} height={300}/>
      <ButtonLink to="/welcome/signup">Sign Up</ButtonLink>
      <ButtonLink to="/welcome/login">Login</ButtonLink>
    </div>
  )
}

Intro.propTypes = {}

export default Intro