import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

describe('<App />', () => {
  test('renders without crashing', () => {
    shallow(<App />)
  })
  test('matches snapshot', () => {
    expect(shallow(<App />)).toMatchSnapshot()
  })
})
