import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import { Demo } from './demo'

describe('demo suite', () => {
  it('should render correct', () => {

    const tree = renderer.create(
      <Demo />
    ).toJSON()

    expect(tree).toMatchSnapshot()

  })

})
