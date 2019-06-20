import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import 'rsuite/dist/styles/rsuite.min.css'
import './index.sass'

render(<App />, document.getElementById('cats-app'))
