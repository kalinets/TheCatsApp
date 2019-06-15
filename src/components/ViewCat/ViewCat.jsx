import React, { Component } from 'react'
import {
  FAVOURITES_URL,
  API_KEY,
  DEFAULT_SEARCH_URL,
  BREED_SEARCH_URL,
  SEARCH_BY_BREED_URL,
} from '$constants'
import './ViewCat.sass'

class ViewCat extends Component {
  state = {
    breeds: [],
    urlWithKitty: '',
    loadingImg: false,
    selectedBreed: '',
    selectedCatId: '',
  }

  componentDidMount() {
    this.getAllBreeds()
  }

  handleClick = async () => {
    if (this.state.loadingImg) return null
    try {
      this.setState({ loadingImg: true, urlWithKitty: '', selectedBreed: '' })
      const res = await fetch(DEFAULT_SEARCH_URL)
      if (res.ok) {
        const data = await res.json()
        this.setState({ urlWithKitty: data[0].url, selectedCatId: data[0].id, loadingImg: false })
      }
    } catch (error) {
      this.setState({ loadingImg: false })
      throw new Error(error)
    }
  }

  getAllBreeds = async () => {
    try {
      const res = await fetch(BREED_SEARCH_URL)
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
      const res = await fetch(SEARCH_BY_BREED_URL + this.state.selectedBreed)
      if (res.ok) {
        const data = await res.json()
        this.setState({ urlWithKitty: data[0].url, selectedCatId: data[0].id, loadingImg: false })
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  handleSelect = async event => {
    await this.setState({ selectedBreed: event.target.value })
    this.getSpecificBreedImage()
  }

  addFavourite = async () => {
    try {
      const res = await fetch(FAVOURITES_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({ image_id: this.state.selectedCatId, sub_id: 'abramov88' }),
      })
      if (res.ok) {
        alert('added')
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  render() {
    const { breeds, urlWithKitty, loadingImg, selectedBreed } = this.state

    return (
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
        <button onClick={this.getSpecificBreedImage}>Show another cat of seleced breed</button>
        <div className="cat-img-container">
          {loadingImg && <h4>Loading...</h4>}
          {urlWithKitty && (
            <>
              <button onClick={this.addFavourite}>Add to favourites</button>
              <img src={urlWithKitty} alt="cat" className="cat-img" />
            </>
          )}
        </div>
      </>
    )
  }
}

export default ViewCat
