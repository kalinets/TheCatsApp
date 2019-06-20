import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import { shallow } from 'enzyme'
import WelcomePage from './WelcomePage'

configure({ adapter: new Adapter() })

describe('<WelcomePage />', () => {
  test('renders without crashing', () => {
    shallow(<WelcomePage />)
  })
  test('matches snapshot', () => {
    expect(shallow(<WelcomePage />)).toMatchSnapshot()
  })
})
