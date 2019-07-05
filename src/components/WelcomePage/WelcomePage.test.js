import React from 'react'
import { shallow } from 'enzyme'
import WelcomePage from './WelcomePage'

describe('<WelcomePage />', () => {
  test('renders without crashing', () => {
    shallow(<WelcomePage />)
  })
  test('matches snapshot', () => {
    expect(shallow(<WelcomePage />)).toMatchSnapshot()
  })
})
