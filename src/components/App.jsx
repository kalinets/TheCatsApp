import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Favourites from './Favourites/Favourites'
import ShowCat from './ShowCat/ShowCat'
import NavBar from './NavBar/NavBar'
import OfflineBanner from './OfflineBanner/OfflineBanner'
import WelcomePage from './WelcomePage/WelcomePage'
import './App.sass'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <h1 className="app-title">The Cats App by @jason</h1>
        <Switch>
          <Route path="/favourites" component={Favourites} />
          <Route path="/view" component={ShowCat} />
          <Route path="/" component={WelcomePage} />
        </Switch>
        <OfflineBanner />
      </BrowserRouter>
    )
  }
}

export default App
