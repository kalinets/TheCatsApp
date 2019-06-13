import React, { Component } from 'react'
import { DEFAULT_SEARCH_URL, BREED_SEARCH_URL, SEARCH_BY_BREED_URL } from '../../constants'
import './ShowCat.sass'

class ShowCat extends Component {
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
      this.setState({ loadingImg: true })
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

  handleSelect = async event => {
    await this.setState({ selectedBreed: event.target.value, loadingImg: true })
    try {
      const res = await fetch(SEARCH_BY_BREED_URL + this.state.selectedBreed)
      if (res.ok) {
        const data = await res.json()
        this.setState({ urlWithKitty: data[0].url, selectedCatId: data[0].id, loadingImg: false })
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  render() {
    const { breeds, urlWithKitty, loadingImg } = this.state

    return (
      <>
        <button onClick={this.handleClick} className="show-cat-button">
          Show random cat
        </button>
        <select onChange={this.handleSelect}>
          Select breed
          <option value="" />
          {breeds.map(breed => (
            <option key={breed.id} value={breed.id}>
              {breed.name}
            </option>
          ))}
        </select>
        <div className="cat-img-container">
          {loadingImg ? 'Loading...' : <img src={urlWithKitty} alt="" className="cat-img" />}
        </div>
      </>
    )
  }
}

export default ShowCat
