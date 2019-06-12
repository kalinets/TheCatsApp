import React, { Component } from 'react'
import { DEFAULT_SEARCH_URL } from '../../constants'
import './ShowCat.sass'

class ShowCat extends Component {
  state = {
    urlWithKitty: '',
    loading: false,
  }

  toggleClick = async () => {
    if (this.state.loading) return null
    try {
      this.setState({ loading: true })
      const res = await fetch(DEFAULT_SEARCH_URL)
      if (res.ok) {
        const data = await res.json()
        this.setState({ urlWithKitty: data[0].url, loading: false })
      }
    } catch (error) {
      this.setState({ loading: false })
      throw new Error(error)
    }
  }

  render() {
    const { urlWithKitty, loading } = this.state

    return (
      <>
        <button onClick={this.toggleClick}>Show random cat</button>
        <div>{loading ? 'Loading...' : <img src={urlWithKitty} alt="" />}</div>
      </>
    )
  }
}

export default ShowCat
