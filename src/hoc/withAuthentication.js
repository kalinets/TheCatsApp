import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AuthUserContext from '../components/AuthUserContext/AuthUserContext'
import { firebase } from '../firebase'

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      const { onSetAuthUser } = this.props
      firebase.auth.onAuthStateChanged(authUser => {
        authUser ? onSetAuthUser(authUser) : onSetAuthUser(null)
      })
    }

    render() {
      const { authUser } = this.state

      return (
        <AuthUserContext.Provider value={authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      )
    }
  }

  const mapDispatchToProps = dispatch => ({
    onSetAuthUser: authUser => dispatch({ type: 'AUTH_USER_SET', authUser }),
  })

  return connect(
    null,
    mapDispatchToProps
  )(WithAuthentication)
}

withAuthentication.propTypes = {
  onSetAuthUser: PropTypes.func,
}

export default withAuthentication
