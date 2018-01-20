import React from 'react'
import { mount, shallow } from 'enzyme'
import withCountDown from './withCountdown'

const mockTick = ({tick}) => <div>{tick.current}</div>

function setupMount() {
  const Component = withCountDown()(mockTick)

  const wrapper = mount(
    <Component />
  )

  return wrapper
}

function setupShallow() {
  const Component = withCountDown()(mockTick)

  const wrapper = shallow(
    <Component />
  )

  return wrapper
}

describe('with count down hoc', () => {

  it('should initial render correct', () => {
    const wrapper = setupShallow()
    expect(wrapper).toMatchSnapshot()
  })

  it('should count down working', () => {
    const wrapper = setupMount()
    const props = wrapper.find('mockTick').props()
    const div = wrapper.find('div')

    props.tick.start()
    expect(div.text()).toBe("59")
  })

})

