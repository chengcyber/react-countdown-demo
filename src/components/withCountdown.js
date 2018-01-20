import React from 'react'
import ReactTimeout from 'react-timeout'

const DEFAULT_CONFIG = {
  count: 60,
}

const withCountDown = (config = DEFAULT_CONFIG) => {

  const {
    count,
  } = config

  return BaseComponent => ReactTimeout(class WithCountDown extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        count: 0,
      }
    }

    componentDidMount() {
      this.setState({
        count,
      })
    }

    startTick = () => {
      const {
        setTimeout,
      } = this.props
      const {
        count,
      } = this.state

      if (count <= 0 || this.cancelled) {
        this.resetTick()
        return
      }

      this.setState(prevState => ({
        count: prevState.count - 1,
      }))

      this.timeoutId = setTimeout(
        this.startTick,
        1000
      )
    }

    stopTick = () => {
      const {
        clearTimeout,
      } = this.props
      this.cancelled = true
      clearTimeout(this.timeoutId)
    }

    resetTick = () => {
      this.stopTick()
      this.setState({
        count,
      }, () => {
        this.cancelled = false
      })
    }

    render() {
      const tick = {
        current: this.state.count,
        start: this.startTick,
        stop: this.stopTick,
        reset: this.resetTick,
      }
      return (
        <BaseComponent
          {...this.props}
          tick={tick}
        />
      )
    }

  })

}


export default withCountDown

