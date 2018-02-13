import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ButtonLink = styled(Link)`
  background:#ffd400;
  color: black;
  padding: 1rem;
  text-decoration: none;
`

ButtonLink.propTypes = {}

export default ButtonLink