import React from 'react'
import { withRouter } from 'react-router-dom'
import AuthUserContext from '../components/AuthUserContext/AuthUserContext'
import * as routes from '../constants/routes'
import { firebase } from '../firebase'

const withAuthorization = authCondition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!authCondition(authUser)) {
          // eslint-disable-next-line react/prop-types
          this.props.history.push(routes.SIGN_IN)
        }
      })
    }
    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => (authUser ? <Component {...this.props} /> : null)}
        </AuthUserContext.Consumer>
      )
    }
  }

  return withRouter(WithAuthorization)
}

export default withAuthorization
