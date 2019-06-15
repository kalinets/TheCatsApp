import React from 'react'
import { Link } from 'react-router-dom'

const WelcomePage = () => (
  <>
    <h2>Welcome to cat lovers app.</h2>
    <p>
      <Link to="/signup">Create an account</Link> if you have not one.
    </p>
  </>
)

export default WelcomePage
