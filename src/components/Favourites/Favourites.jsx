import React, { Component } from 'react'
import { FAVOURITES_URL, API_KEY } from '$constants'

class Favourites extends Component {
  state = {
    favourites: null,
    loading: true,
    error: null,
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
      this.setState({ error, loading: false })
      throw new Error(error)
    }
  }

  addFavouriteBack = async () => {
    try {
      console.log('added back')
      // const res = await fetch(FAVOURITES_URL, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'x-api-key': API_KEY,
      //   },
      //   body: JSON.stringify({ image_id: this.state.selectedCatId, sub_id: 'abramov88' }),
      // })
      // if (res.ok) {
      //   alert('added')
      // }
    } catch (error) {
      throw new Error(error)
    }
  }

  removeFavorite = async (favId, catId) => {
    console.log(favId, catId)
    // try {
    //   const res = await fetch(FAVOURITES_URL + '/' + favId, {
    //     method: 'DELETE',
    //     headers: {
    //       'x-api-key': API_KEY,
    //     },
    //   })
    //   if (res.ok) {
    //     alert('removed')
    //   }
    // } catch (error) {
    //   throw new Error(error)
    // }
  }

  render() {
    const { favourites, loading, error } = this.state
    return (
      <>
        <h2>Favourites</h2>
        {loading ? (
          <h4>Loading...</h4>
        ) : (
          <div>
            {favourites &&
              (!favourites.length
                ? 'You have no favourite cat images'
                : favourites.map(cat => (
                    <li key={cat.id}>
                      {cat.image.url}{' '}
                      <button onClick={() => this.removeFavorite(cat.id, cat.image_id)}>
                        Remove
                      </button>
                      {/* <button>Add back to favorites</button> */}
                    </li>
                  )))
            //: favourites.map(cat => <img key={cat.id} src={cat.image.url} alt="cat" />)
            }
            {error && <p>{error.message}</p>}
          </div>
        )}
      </>
    )
  }
}

export default Favourites
