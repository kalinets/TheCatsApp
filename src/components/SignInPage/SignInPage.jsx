// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import SignInForm from './SignInForm'

const SignInPage = ({ history }) => (
  <>
    <h2>Sign in page</h2>
    <SignInForm history={history} />
  </>
)

SignInPage.propTypes = {
  history: PropTypes.object,
}

export default withRouter(SignInPage)
