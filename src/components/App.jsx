import React, { Component } from 'react'
import ShowCat from './ShowCat/ShowCat'
import './App.sass'

class App extends Component {
  state = {
    isOnline: true,
  }

  componentDidMount() {
    window.addEventListener('offline', this.connectionHandler)
    window.addEventListener('online', this.connectionHandler)
  }

  connectionHandler = () => this.setState({ isOnline: navigator.onLine ? true : false })

  render() {
    const { isOnline } = this.state
    return (
      <>
        <h1 className="app-title">The Cats App by @jason</h1>
        <ShowCat isOnline={isOnline} />
        {!isOnline && <div className="app-offline"><strong>You are offline</strong></div>}
      </>
    )
  }
}

export default App
