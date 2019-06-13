import React, { Component } from 'react'
import { FAVOURITES_URL, API_KEY } from '../../constants'

class Favourites extends Component {
  state = {
    favourites: [],
  }
  componentDidMount() {
    this.getFavs()
  }

  getFavs = async () => {
    try {
      const res = await fetch(FAVOURITES_URL, {
        headers: {
          'x-api-key': API_KEY,
        },
      })
      if (res.ok) {
        const data = await res.json()
        this.setState({ favourites: data })
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  render() {
    return <h2>Favourites</h2>
  }
}

export default Favourites
