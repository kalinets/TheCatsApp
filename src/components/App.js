
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import withAuthentication from '../hoc/withAuthentication'
import * as Routes from '../constants/routes'
import Favourites from './Favourites/Favourites'
import ViewCat from './ViewCat/ViewCat'
import NavBar from './NavBar/NavBar'
import OfflineBanner from './OfflineBanner/OfflineBanner'
import WelcomePage from './WelcomePage/WelcomePage'
import NotFound from './NotFound/NotFound'
import SignInPage from './SignInPage/SignInPage'
import SignUpPage from './SignUpPage/SignUpPage'
import 'rsuite/dist/styles/rsuite.min.css'

const App = () => (
  <BrowserRouter>
    <NavBar />
    <h1>The Cats App by @jason</h1>
    <div className="inner">
      <Switch>
        <Route exact path={Routes.HOME} component={WelcomePage} />
        <Route path={Routes.FAVOURITES} component={Favourites} />
        <Route path={Routes.SIGN_UP} component={SignUpPage} />
        <Route path={Routes.SIGN_IN} component={SignInPage} />
        <Route path={Routes.VIEW_CAT} component={ViewCat} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
    <OfflineBanner />
  </BrowserRouter>
)

export default withAuthentication(App)
