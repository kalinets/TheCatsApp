import React, { Component } from 'react'
import * as Constants from '../../constants'
import { firebase } from '../../firebase'
import withAuthorization from '../../hoc/withAuthorization'
import AuthUserContext from '../AuthUserContext/AuthUserContext'
import { Button, Loader, SelectPicker } from 'rsuite'

type State = {
  breeds: Array<Object>,
  urlWithKitty: string,
  loadingPage: boolean,
  loadingImg: boolean,
  selectedBreed: string,
  selectedCatId: string,
  isAddedToFavourites: boolean,
  error: string,
  favourites: Array<Object>,
  favouriteId: string,
  isBeingAddedToFavourites: boolean,
  isBeingRemovedFromFavourites: boolean,
  kittyImageWidth: Number,
  kittyImageHeight: Number,
}

class ViewCat extends Component<{}, State> {
  state = {
    breeds: [],
    urlWithKitty: '',
    kittyImageWidth: null,
    kittyImageHeight: null,
    loadingPage: true,
    loadingImg: false,
    selectedBreed: '',
    selectedCatId: '',
    isAddedToFavourites: false,
    error: '',
    favourites: [],
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
          kittyImageWidth: data[0].width,
          kittyImageHeight: data[0].height,
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
        this.setState({ breeds: data, loadingPage: false })
      }
    } catch (error) {
      this.setState({ error, loadingPage: false })
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

  handleSelect = async (value: string) => {
    await this.setState({ selectedBreed: value })
    this.getSpecificBreedImage()
  }

  addFavourite = async (userId: Number) => {
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

  getAllFavourites = async (userId: Number) => {
    try {
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
        this.setState({ favourites: filteredFavourites })
      }
    } catch (error) {
      this.setState({ error })
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
      kittyImageWidth,
      kittyImageHeight,
      loadingImg,
      loadingPage,
      selectedBreed,
      isAddedToFavourites,
      error,
      isBeingAddedToFavourites,
      isBeingRemovedFromFavourites,
    } = this.state

    const filteredBreeds = breeds.map(breed => ({ label: breed.name, value: breed.id }))

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <>
            <h2>View cats</h2>
            {loadingPage ? (
              <Loader size="lg" center backdrop />
            ) : (
              <div className="viewer-wrapper">
                <div className="controls">
                  <Button color="blue" onClick={this.getRandomCat} loading={loadingImg}>
                    Show random cat
                  </Button>
                  <SelectPicker
                    onChange={this.handleSelect}
                    value={selectedBreed}
                    data={filteredBreeds}
                    cleanable={false}
                    placeholder={'Or select breed'}
                    appearance={'subtle'}
                  />
                  {selectedBreed && (
                    <Button color="blue" onClick={this.getSpecificBreedImage} loading={loadingImg}>
                      Another cat of this breed
                    </Button>
                  )}
                </div>
                <div className="image-viewer">
                  {loadingImg && <Loader center size="md" />}
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
                      <div
                        className="image-container"
                        style={{ paddingTop: (kittyImageHeight / kittyImageWidth) * 100 + '%' }}
                      >
                        <p>Loading image...</p>
                        <img src={urlWithKitty} alt="cat" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            {error && <p className="error">{error.message}</p>}
          </>
        )}
      </AuthUserContext.Consumer>
    )
  }
}

const authCondition = authUser => !!authUser

export default withAuthorization(authCondition)(ViewCat)
