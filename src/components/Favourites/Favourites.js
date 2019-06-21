// @flow

import React, { Component } from 'react'
import withAuthorization from '../../hoc/withAuthorization'
import { firebase } from '../../firebase'
import * as Constants from '../../constants'
import { Button, Loader } from 'rsuite'

type State = {
  favourites: Array<Object>,
  loadingPage: boolean,
  error: Object,
  removed: Array<Number>,
}

class Favourites extends Component<{}, State> {
  state = {
    favourites: [],
    loadingPage: true,
    error: null,
    removed: [],
  }

  componentDidMount() {
    this.updateFavourites()
  }

  updateFavourites = () => {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser && this.getAllFavourites(authUser.uid)
    })
  }

  getAllFavourites = async userId => {
    try {
      this.setState({ loadingPage: true })
      const res = await fetch('https://api.thecatapi.com/v1/favourites', {
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': Constants.API_KEY,
        },
      })
      if (res.ok) {
        const data = await res.json()
        const filteredFavourites = data.filter(favourite => favourite.sub_id === userId)
        this.setState({ favourites: filteredFavourites, loadingPage: false })
      }
    } catch (error) {
      this.setState({ error, loadingPage: false })
      throw new Error(error)
    }
  }

  removeFavorite = async favId => {
    try {
      const res = await fetch(Constants.FAVOURITES_URL + '/' + favId, {
        method: 'DELETE',
        headers: {
          'x-api-key': Constants.API_KEY,
        },
      })
      if (res.ok) {
        this.setState(prevState => {
          const newRemoved = [...prevState.removed, favId]
          return { removed: newRemoved }
        })
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  addFavouriteBack = async (favId, imageId, userId) => {
    try {
      const res = await fetch(Constants.FAVOURITES_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': Constants.API_KEY,
        },
        body: JSON.stringify({ image_id: imageId, sub_id: userId }),
      })
      if (res.ok) {
        const newRemoved = [...this.state.removed]
        var index = newRemoved.indexOf(favId)
        if (index !== -1) {
          newRemoved.splice(index, 1)
          this.setState({ removed: newRemoved })
          // this.updateFavourites()
        }
      }
    } catch (error) {
      this.setState({ error })
      throw new Error(error)
    }
  }

  isRemoved = id => this.state.removed.includes(id)

  render() {
    const { favourites, loadingPage } = this.state
    return (
      <>
        <h2>Favourites</h2>
        {loadingPage ? (
          <Loader size="lg" center backdrop />
        ) : (
          <div className="favourites-container">
            {!favourites.length
              ? 'You have no favourite cat images'
              : favourites.map(favourite => (
                  <div key={favourite.id} className="favourite">
                    <img src={favourite.image.url} alt="cat" />
                    {this.isRemoved(favourite.id) ? (
                      <Button
                        color="green"
                        onClick={() =>
                          this.addFavouriteBack(favourite.id, favourite.image_id, favourite.sub_id)
                        }
                      >
                        Add back to favorites
                      </Button>
                    ) : (
                      <Button color="red" onClick={() => this.removeFavorite(favourite.id)}>
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
          </div>
        )}
      </>
    )
  }
}

const authCondition = authUser => !!authUser

export default withAuthorization(authCondition)(Favourites)
