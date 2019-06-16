import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { HOME } from '../../constants/routes'
import { auth } from '../../firebase'
import { Button } from 'rsuite'

type Props = {
  history: mixed,
}

type State = {
  email: String,
  password: String,
  error: Object,
}

class SignInForm extends Component<Props, State> {
  static propTypes = {
    history: PropTypes.object,
  }

  state = {
    email: '',
    password: '',
    error: '',
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = e => {
    this.setState({ error: '' })
    const { history } = this.props
    const { email, password } = this.state
    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => history.push(HOME))
      .catch(error => this.setState({ error }))
    e.preventDefault()
  }

  render() {
    const { email, password, error } = this.state
    const isInvalid = !email || !password
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={this.handleChange}
            onFocus={() => this.setState({ error: '' })}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={this.handleChange}
            onFocus={() => this.setState({ error: '' })}
          />
        </div>
        <div>
          <Button type="submit" color="green" disabled={isInvalid}>
            Sign in
          </Button>
        </div>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

export default SignInForm
