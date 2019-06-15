import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Favourites from './Favourites/Favourites'
import ViewCat from './ViewCat/ViewCat'
import NavBar from './NavBar/NavBar'
import OfflineBanner from './OfflineBanner/OfflineBanner'
import WelcomePage from './WelcomePage/WelcomePage'
import NotFound from './NotFound/NotFound'
import SignUpPage from './SignUpPage/SignUpPage'
import './App.sass'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <h1 className="app-title">The Cats App by @jason</h1>
        <Switch>
          <Route path="/favourites" component={Favourites} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/view" component={ViewCat} />
          <Route exact path="/" component={WelcomePage} />
          <Route path="*" component={NotFound} />
        </Switch>
        <OfflineBanner />
      </BrowserRouter>
    )
  }
}

export default App
