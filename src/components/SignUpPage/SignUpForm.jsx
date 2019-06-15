import React, { Component } from 'react'
import PropTypes from 'prop-types'

const initialState = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: '',
}

class SignUpForm extends Component {
  static propTypes = {
    firebase: PropTypes.object,
  }

  state = { ...initialState }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = e => {
    e.preventDefault()
  }

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state
    const isInvalid = passwordOne !== passwordTwo || !passwordOne
    return (
      <form onSubmit={this.handleSubmit}>
        <li>
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={this.handleChange}
            value={username}
            required
          />
        </li>
        <li>
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={this.handleChange}
            value={email}
            required
          />
        </li>
        <li>
          <input
            type="password"
            name="passwordOne"
            placeholder="enter password"
            onChange={this.handleChange}
            value={passwordOne}
            required
          />
        </li>
        <li>
          <input
            type="password"
            name="passwordTwo"
            placeholder="repeat password"
            onChange={this.handleChange}
            value={passwordTwo}
            required
          />
        </li>
        <li>
          <button disabled={isInvalid}>Submit</button>
        </li>
        {error && <div>{error}</div>}
      </form>
    )
  }
}

export default SignUpForm
