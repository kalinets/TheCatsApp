import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase'
import * as Routes from '../../constants/routes'
import AuthUserContext from '../AuthUserContext/AuthUserContext'

const NavBar = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <nav className="main-nav">
        <Link to={Routes.HOME}>Home</Link>
        {authUser ? (
          <>
            <Link to={Routes.VIEW_CAT}>View cats</Link>
            <Link to={Routes.FAVOURITES}>Favourite cats</Link>
            <button type="button" onClick={auth.doSignOut}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to={Routes.SIGN_IN}>Sign in</Link>
            <Link to={Routes.SIGN_UP}>Create account</Link>
          </>
        )}
      </nav>
    )}
  </AuthUserContext.Consumer>
)

export default NavBar
