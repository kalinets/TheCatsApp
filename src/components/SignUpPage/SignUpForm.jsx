import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { HOME } from '../../constants/routes'
import { auth } from '../../firebase'

class SignUpForm extends Component {
  static propTypes = {
    history: PropTypes.object,
  }

  state = { email: '', passwordOne: '', passwordTwo: '', error: '' }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = e => {
    const { history } = this.props
    const { email, passwordOne } = this.state
    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(() => {
        history.push(HOME)
      })
      .catch(error => this.setState({ error }))
    e.preventDefault()
  }

  render() {
    const { email, passwordOne, passwordTwo, error } = this.state
    const isInvalid = passwordOne !== passwordTwo || !passwordOne
    return (
      <form onSubmit={this.handleSubmit}>
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
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

export default SignUpForm
