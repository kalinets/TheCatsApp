import React, { Component } from 'react'
import { FAVOURITES_URL, API_KEY } from '$constants'

class Favourites extends Component {
  state = {
    favourites: [],
    loading: true,
  }
  componentDidMount() {
    this.getFavs()
  }

  getFavs = async () => {
    try {
      this.setState({ loading: true })
      const res = await fetch('https://api.thecatapi.com/v1/favourites', {
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
      })
      if (res.ok) {
        const data = await res.json()
        const filteredCats = data.filter(cat => cat.sub_id === 'abramov88')
        this.setState({ favourites: filteredCats, loading: false })
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  removeFavorite = async id => {
    try {
      const res = await fetch(FAVOURITES_URL + '/' + id, {
        method: 'DELETE',
        headers: {
          'x-api-key': API_KEY,
        },
      })
      if (res.ok) {
        alert('removed')
        this.getFavs()
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  render() {
    const { favourites, loading } = this.state
    return (
      <>
        <h2>Favourites</h2>
        {loading ? (
          <h4>Loading...</h4>
        ) : (
          <div>
            {!favourites.length
              ? 'You have no favourite cat images'
              : favourites.map(cat => (
                  <li key={cat.id}>
                    {cat.image.url}{' '}
                    <button onClick={() => this.removeFavorite(cat.id)}>Remove</button>
                  </li>
                ))
            //: favourites.map(cat => <img key={cat.id} src={cat.image.url} alt="cat" />)
            }
          </div>
        )}
      </>
    )
  }
}

export default Favourites
