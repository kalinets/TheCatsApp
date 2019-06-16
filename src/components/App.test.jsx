import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

configure({ adapter: new Adapter() })
describe('<App />', () => {
  test('renders without crashing', () => {
    shallow(<App />)
  })
  test('matches snapshot', () => {
    expect(shallow(<App />)).toMatchSnapshot()
  })
})
