import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import store from './redux/store'
import 'rsuite/dist/styles/rsuite.min.css'
import './index.sass'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('cats-app')
)
