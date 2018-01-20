import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  validatePhone,
} from '../actions/phoneValidation'
import getPhoneValidation from '../selectors/phoneValidation'

import withCountDown from './withCountdown'

export class Demo extends React.Component {

  static propTypes = {
    isValidating: PropTypes.bool,
    hasValidated: PropTypes.bool,
    result: PropTypes.string,
    errorMsg: PropTypes.string,
    tick: PropTypes.shape({
      current: PropTypes.number,
      start: PropTypes.func,
      stop: PropTypes.func,
      reset: PropTypes.func,
    }),
    textMap: PropTypes.shape({
      success: PropTypes.string,
      phoneInvalid: PropTypes.string,
      validating: PropTypes.func,
      send: PropTypes.string,
      placeholder: PropTypes.string,
    }),
  }

  static defaultProps = {
    textMap: {
      success: 'validate success',
      phoneInvalid: 'invaid phone number',
      validating: (count) => `validating (${count})s`,
      send: 'send',
      placeholder: 'Phone Number'
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      textInput: '',
      textInputErr: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      isValidating,
      tick,
    } = this.props
    if (isValidating && !nextProps.isValidating) {
      tick.reset()
      this.resetTextInputErr()
    }
  }

  resetTextInputErr = () => {
    this.setState({
      textInputErr: '',
    })
  }

  checkTextInput = () => {
    const {
      textInput,
    } = this.state

    const phoneReg = /^(\d{3}-)?\d{8}$/
    const mobileReg = /^(\+\d{2})?(\d{4})?\d{11}$/
    return phoneReg.test(textInput) || mobileReg.test(textInput)
  }

  handleChangeInput = (evt) => {
    const textInput = evt.target.value
    this.setState({
      textInput,
    })
    if (this.checkTextInput()) {
      this.resetTextInputErr()
    }
  }

  handleClickSend = () => {
    const {
      isValidating,
      validatePhone,
      tick,
      textMap,
    } = this.props
    if (!this.checkTextInput()) {
      this.setState({
        textInputErr: textMap.phoneInvalid,
      })
      return
    }
    if (isValidating) {
      return
    }

    this.resetTextInputErr()
    validatePhone(this.state.textInput)
    tick.start()
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 13 ) {  // enter
      this.handleClickSend();
    }
  }

  handleBlur = () => {
    const {
      textMap,
    } = this.props
    if (!this.checkTextInput()) {
      this.setState({
        textInputErr: textMap.phoneInvalid,
      })
      return
    }
    this.resetTextInputErr()
  }

  renderButtonText() {
    const {
      isValidating,
      tick,
      textMap,
    } = this.props
    if (isValidating) {
      return textMap.validating(tick.current)
    }

    return textMap.send
  }

  renderStatus() {
    const {
      errorMsg,
      textMap,
      result,
    } = this.props
    const {
      textInputErr,
    } = this.state

    if (textInputErr || errorMsg) {
      return (
        <div
          className="form-status error"
        >
          { textInputErr || errorMsg }
        </div>
      )
    }

    if (result === 'ok') {
      return (
        <div className="form-status success">
          { textMap.success }
        </div>
      )
    }

    return null
  }

  render() {
    const {
      isValidating,
      textMap,
    } = this.props
    const {
      textInput,
    } = this.state

    return (
      <div className="form-input-wrap">
        <input
          className="form-input"
          value={textInput}
          placeholder={textMap.placeholder}
          onChange={this.handleChangeInput}
          onKeyDown={this.handleKeyDown}
          onBlur={this.handleBlur}
        />
        <button
          className="form-button"
          onClick={this.handleClickSend}
          disabled={!!isValidating}
        >
          { this.renderButtonText() }
        </button>
        { this.renderStatus() }
      </div>
    )
  }
}


const mapStateToProps = state => getPhoneValidation(state)

const mapDispatchToProps = {
  validatePhone,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withCountDown()(Demo))

