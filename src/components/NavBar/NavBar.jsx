import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class NavBar extends Component {
  static propTypes = {
    isOnline: PropTypes.bool,
  }

  render() {
    return (
      <nav className="main-nav">
        <Link to="/">Home</Link>
        <Link to="/view">View cats</Link>
        <Link to="/favourites">Favourite cats</Link>
      </nav>
    )
  }
}

export default NavBar
