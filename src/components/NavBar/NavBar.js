// @flow

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { firebase, auth } from '../../firebase'
import { API_KEY } from '../../constants'
import * as Routes from '../../constants/routes'
import AuthUserContext from '../AuthUserContext/AuthUserContext'
import { Button } from 'rsuite'

type State = {
  favourites: Array<Object>,
  error: Object,
}

class NavBar extends Component<{}, State> {
  state = {
    favourites: [],
    error: '',
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser && this.getAllFavourites(authUser.uid)
    })
  }

  getAllFavourites = async (userId: Number) => {
    try {
      const res = await fetch('https://api.thecatapi.com/v1/favourites', {
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
      })
      if (res.ok) {
        const data = await res.json()
        const filteredFavourites = data.filter(favourite => favourite.sub_id === userId)
        this.setState({ favourites: filteredFavourites })
      }
    } catch (error) {
      this.setState({ error })
      throw new Error(error)
    }
  }
  render() {
    const { favourites } = this.state
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <nav>
            <div className="inner">
              <Link to={Routes.HOME}>Home</Link>
              {authUser ? (
                <>
                  <Link to={Routes.VIEW_CAT}>View cats</Link>
                  {!!favourites.length && <Link to={Routes.FAVOURITES}>Favourite cats</Link>}
                  <div className="separator" />
                  <Button color="yellow" type="button" onClick={auth.doSignOut}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to={Routes.SIGN_IN}>Sign in</Link>
                  <Link to={Routes.SIGN_UP}>Create account</Link>
                  <div className="separator" />
                </>
              )}
            </div>
          </nav>
        )}
      </AuthUserContext.Consumer>
    )
  }
}

export default NavBar
