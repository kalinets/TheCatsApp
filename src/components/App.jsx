import React, { Component } from 'react'
import ShowCat from './ShowCat/ShowCat'
import './App.sass'

class App extends Component {
  render() {
    return (
      <>
        <h1 className="app-title">The Cats App by @jason</h1>
        <ShowCat />
      </>
    )
  }
}

export default App
