import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import { shallow } from 'enzyme'
import OfflineBanner from './OfflineBanner'

configure({ adapter: new Adapter() })

describe('<OfflineBanner />', () => {
  test('renders without crashing', () => {
    shallow(<OfflineBanner />)
  })
  test('matches snapshot', () => {
    expect(shallow(<OfflineBanner />)).toMatchSnapshot()
  })
  test('state isOnline should be true by default', () => {
    expect(shallow(<OfflineBanner />).state('isOnline')).toBeTruthy()
  })
})
