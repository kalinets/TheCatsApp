import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import './index.sass'

render(<App />, document.getElementById('cats-app'))

module.hot.accept()
