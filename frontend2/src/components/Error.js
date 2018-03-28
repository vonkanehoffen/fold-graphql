import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'

const Error = ({title, message, reset}) => {
  return (
    <div>
      Error: <b>{title}</b> {message}
      <IconButton onClick={reset}>
        <CloseIcon/>
      </IconButton>
    </div>
  )
}

Error.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  reset: PropTypes.func,
}

export default Error