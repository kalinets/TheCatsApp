import React, { Component } from 'react'
import * as Constants from '../../constants'
import { firebase } from '../../firebase'
import withAuthorization from '../../hoc/withAuthorization'
import AuthUserContext from '../AuthUserContext/AuthUserContext'
import { Button, Loader } from 'rsuite'

class ViewCat extends Component {
  state = {
    breeds: [],
    urlWithKitty: '',
    loadingImg: false,
    selectedBreed: '',
    selectedCatId: '',
    isAddedToFavourites: false,
    error: '',
    favourites: null,
    favouriteId: '',
    isBeingAddedToFavourites: false,
    isBeingRemovedFromFavourites: false,
  }

  componentDidMount() {
    this.getAllBreeds()
    this.updateFavourites()
  }

  updateFavourites = () => {
    firebase.auth.onAuthStateChanged(authUser => {
      this.getAllFavourites(authUser.uid)
    })
  }

  getRandomCat = async () => {
    const { favourites, loadingImg } = this.state
    if (loadingImg) return null
    try {
      this.setState({
        loadingImg: true,
        urlWithKitty: '',
        selectedCatId: '',
        selectedBreed: '',
        isAddedToFavourites: false,
      })
      const res = await fetch(Constants.DEFAULT_SEARCH_URL)
      if (res.ok) {
        const data = await res.json()
        const isFavourite = favourites.some(favourite => favourite.image_id === data[0].id)
        this.setState({
          urlWithKitty: data[0].url,
          selectedCatId: data[0].id,
          loadingImg: false,
          isAddedToFavourites: isFavourite,
          favouriteId:
            isFavourite && favourites.find(favourite => favourite.image_id === data[0].id).id,
        })
      }
    } catch (error) {
      this.setState({ loadingImg: false, error })
    }
  }

  getAllBreeds = async () => {
    try {
      const res = await fetch(Constants.BREED_SEARCH_URL)
      if (res.ok) {
        const data = await res.json()
        this.setState({ breeds: data })
      }
    } catch (error) {
      this.setState({ error })
    }
  }

  getSpecificBreedImage = async () => {
    const { favourites, loadingImg, selectedBreed } = this.state
    if (loadingImg) return null
    try {
      this.setState({ loadingImg: true, urlWithKitty: '', isAddedToFavourites: false })
      const res = await fetch(Constants.SEARCH_BY_BREED_URL + selectedBreed)
      if (res.ok) {
        const data = await res.json()
        const isFavourite = favourites.some(favourite => favourite.image_id === data[0].id)
        this.setState({
          urlWithKitty: data[0].url,
          selectedCatId: data[0].id,
          loadingImg: false,
          isAddedToFavourites: isFavourite,
          favouriteId:
            isFavourite && favourites.find(favourite => favourite.image_id === data[0].id).id,
        })
      }
    } catch (error) {
      this.setState({ error })
    }
  }

  handleSelect = async event => {
    await this.setState({ selectedBreed: event.target.value })
    this.getSpecificBreedImage()
  }

  addFavourite = async userId => {
    try {
      this.setState({ isBeingAddedToFavourites: true })
      const res = await fetch(Constants.FAVOURITES_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': Constants.API_KEY,
        },
        body: JSON.stringify({ image_id: this.state.selectedCatId, sub_id: userId }),
      })
      if (res.ok) {
        const data = await res.json()
        if (data.message === 'SUCCESS') {
          this.setState({
            isBeingAddedToFavourites: false,
            isAddedToFavourites: true,
            favouriteId: data.id,
          })
          this.updateFavourites()
        }
      }
    } catch (error) {
      this.setState({ error })
    }
  }

  getAllFavourites = async userId => {
    try {
      this.setState({ loading: true })
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
        this.setState({ favourites: filteredFavourites, loading: false })
      }
    } catch (error) {
      this.setState({ error, loading: false })
      throw new Error(error)
    }
  }

  removeFavorite = async () => {
    try {
      this.setState({ isBeingRemovedFromFavourites: true })
      const res = await fetch(Constants.FAVOURITES_URL + '/' + this.state.favouriteId, {
        method: 'DELETE',
        headers: {
          'x-api-key': Constants.API_KEY,
        },
      })
      if (res.ok) {
        this.setState({
          isBeingRemovedFromFavourites: false,
          favouriteId: '',
          isAddedToFavourites: false,
        })
        this.updateFavourites()
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  render() {
    const {
      breeds,
      urlWithKitty,
      loadingImg,
      selectedBreed,
      isAddedToFavourites,
      error,
      isBeingAddedToFavourites,
      isBeingRemovedFromFavourites,
    } = this.state

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <>
            <h2>View cats</h2>
            <div>
              <Button color="blue" onClick={this.getRandomCat} loading={loadingImg}>
                Show random cat
              </Button>
            </div>
            <p>Or select breed:</p>
            <select onChange={this.handleSelect} value={selectedBreed}>
              <option value="" />
              {breeds.map(breed => (
                <option key={breed.id} value={breed.id}>
                  {breed.name}
                </option>
              ))}
            </select>
            {selectedBreed && (
              <Button color="blue" onClick={this.getSpecificBreedImage} loading={loadingImg}>
                Show another cat of selected breed
              </Button>
            )}
            <div>
              {loadingImg && <Loader />}
              {urlWithKitty && (
                <>
                  {isAddedToFavourites ? (
                    <Button
                      color="red"
                      onClick={this.removeFavorite}
                      loading={isBeingRemovedFromFavourites}
                    >
                      Remove from favourites
                    </Button>
                  ) : (
                    <Button
                      color="green"
                      onClick={() => this.addFavourite(authUser.uid)}
                      loading={isBeingAddedToFavourites}
                    >
                      Add to favourites
                    </Button>
                  )}
                  <img src={urlWithKitty} alt="cat" />
                </>
              )}
            </div>
            {error && <p className="error">{error.message}</p>}
          </>
        )}
      </AuthUserContext.Consumer>
    )
  }
}

const authCondition = authUser => !!authUser

export default withAuthorization(authCondition)(ViewCat)
