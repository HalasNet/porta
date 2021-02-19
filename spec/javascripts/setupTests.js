// @flow

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adapter()})

// DELETE: this is false
import $ from 'jquery'
$.flash = {
  notice: jest.fn(),
  error: jest.fn()
}
