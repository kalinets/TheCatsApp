import React, { Component } from 'react'
import * as Constants from '../../constants'
import withAuthorization from '../../hoc/withAuthorization'
import AuthUserContext from '../AuthUserContext/AuthUserContext'
import './ViewCat.sass'

class ViewCat extends Component {
  state = {
    breeds: [],
    urlWithKitty: '',
    loadingImg: false,
    selectedBreed: '',
    selectedCatId: '',
    addedToFavourites: false,
  }

  componentDidMount() {
    this.getAllBreeds()
  }

  handleClick = async () => {
    if (this.state.loadingImg) return null
    try {
      this.setState({ loadingImg: true, urlWithKitty: '', selectedBreed: '' })
      const res = await fetch(Constants.DEFAULT_SEARCH_URL)
      if (res.ok) {
        const data = await res.json()
        this.setState({
          urlWithKitty: data[0].url,
          selectedCatId: data[0].id,
          loadingImg: false,
          addedToFavourites: false,
        })
      }
    } catch (error) {
      this.setState({ loadingImg: false })
      throw new Error(error)
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
      throw new Error(error)
    }
  }

  getSpecificBreedImage = async () => {
    if (this.state.loadingImg) return null
    try {
      this.setState({ loadingImg: true, urlWithKitty: '' })
      const res = await fetch(Constants.SEARCH_BY_BREED_URL + this.state.selectedBreed)
      if (res.ok) {
        const data = await res.json()
        this.setState({
          urlWithKitty: data[0].url,
          selectedCatId: data[0].id,
          loadingImg: false,
          addedToFavourites: false,
        })
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  handleSelect = async event => {
    await this.setState({ selectedBreed: event.target.value })
    this.getSpecificBreedImage()
  }

  addFavourite = async userId => {
    try {
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
          this.setState({ addedToFavourites: true })
          alert('added')
        }
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  render() {
    const { breeds, urlWithKitty, loadingImg, selectedBreed, addedToFavourites } = this.state

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <>
            <button onClick={this.handleClick} className="show-cat-button">
              Show random cat
            </button>
            Select breed:
            <select onChange={this.handleSelect} value={selectedBreed}>
              <option value="" />
              {breeds.map(breed => (
                <option key={breed.id} value={breed.id}>
                  {breed.name}
                </option>
              ))}
            </select>
            {selectedBreed && (
              <button onClick={this.getSpecificBreedImage}>
                Show another cat of seleced breed
              </button>
            )}
            <div className="cat-img-container">
              {loadingImg && <h4>Loading...</h4>}
              {urlWithKitty && (
                <>
                  <button onClick={() => this.addFavourite(authUser.uid)} disabled={addedToFavourites}>
                    Add to favourites
                  </button>
                  <img src={urlWithKitty} alt="cat" className="cat-img" />
                </>
              )}
            </div>
          </>
        )}
      </AuthUserContext.Consumer>
    )
  }
}

const authCondition = authUser => !!authUser

export default withAuthorization(authCondition)(ViewCat)
