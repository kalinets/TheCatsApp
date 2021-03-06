// @flow

import React, { Component } from 'react'

type State = {
  isOnline: boolean
}

class OfflineBanner extends Component<{}, State> {
  state = {
    isOnline: true,
  }

  componentDidMount() {
    this.connectionHandler()
    window.addEventListener('offline', this.connectionHandler)
    window.addEventListener('online', this.connectionHandler)
  }

  connectionHandler = () => this.setState({ isOnline: navigator.onLine ? true : false })

  render() {
    const { isOnline } = this.state

    return (
      <>
        {!isOnline && (
          <div className="app-offline">
            <strong>No connection</strong>
          </div>
        )}
      </>
    )
  }
}

export default OfflineBanner
