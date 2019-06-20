// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import SignUpForm from './SignUpForm'

const SignUpPage = ({ history }) => (
  <>
    <h2>Sign up page</h2>
    <SignUpForm history={history} />
  </>
)

SignUpPage.propTypes = {
  history: PropTypes.object,
}

export default withRouter(SignUpPage)
