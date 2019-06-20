// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import AuthUserContext from '../AuthUserContext/AuthUserContext'

const WelcomePage = () => (
  <>
    <h2>Welcome to cat lovers app.</h2>
    <AuthUserContext.Consumer>
      {user => (
        <>
          {!user && (
            <p>
              <Link to="/signup">Create account</Link>
              {` to see beautiful cats and have fun ;)`}
            </p>
          )}
        </>
      )}
    </AuthUserContext.Consumer>
  </>
)

export default WelcomePage
