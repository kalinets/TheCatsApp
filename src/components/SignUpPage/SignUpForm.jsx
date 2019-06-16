import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { HOME } from '../../constants/routes'
import { auth } from '../../firebase'
import { Button } from 'rsuite'

class SignUpForm extends Component {
  static propTypes = {
    history: PropTypes.object,
  }

  state = { email: '', passwordOne: '', passwordTwo: '', error: '' }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = e => {
    this.setState({ error: '' })
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
        <div>
          <input
            type="email"
            name="email"
            placeholder="email"
            onFocus={() => this.setState({ error: '' })}
            onChange={this.handleChange}
            value={email}
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="passwordOne"
            placeholder="enter password"
            onFocus={() => this.setState({ error: '' })}
            onChange={this.handleChange}
            value={passwordOne}
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="passwordTwo"
            placeholder="repeat password"
            onFocus={() => this.setState({ error: '' })}
            onChange={this.handleChange}
            value={passwordTwo}
            required
          />
        </div>
        <div>
          <Button type="submit" color="green" disabled={isInvalid}>
            Submit
          </Button>
        </div>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

export default SignUpForm
