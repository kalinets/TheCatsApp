// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import SignUpForm from './SignUpForm'

const SignUpPage = ({ history }) => (
  <>
    <h4>Sign up page</h4>
    <SignUpForm history={history} />
  </>
)

SignUpPage.propTypes = {
  history: PropTypes.object,
}

export default withRouter(SignUpPage)
