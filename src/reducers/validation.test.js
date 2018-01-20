import reducer, { initialState } from './validation'
import {
  PHONE_VALIDATION_REQUEST,
  PHONE_VALIDATION_SUCCESS,
  PHONE_VALIDATION_FAILURE,
} from '../actions/phoneValidation'

describe('validation reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should change status when requesting', () => {
    const excpetedState = {
      isValidating: true,
      hasValidated: false,
      result: '',
      errorMsg: '',
    }

    expect(
      reducer(initialState, {
        type: PHONE_VALIDATION_REQUEST,
      })
    ).toEqual(excpetedState)
  })

  it('should persist data when success', () => {
    const excpetedState = {
      isValidating: false,
      hasValidated: true,
      result: 'ok',
      errorMsg: '',
    }

    expect(
      reducer(initialState, {
        type: PHONE_VALIDATION_SUCCESS,
        payload: {
          result: 'ok',
          errorMsg: '',
        },
      })
    ).toEqual(excpetedState)
  })

  it('should set error message when failure', () => {
    const excpetedState = {
      isValidating: false,
      hasValidated: false,
      result: 'error',
      errorMsg: 'here is error message',
    }

    expect(
      reducer(initialState, {
        type: PHONE_VALIDATION_FAILURE,
        payload: {
          result: 'error',
          errorMsg: 'here is error message',
        },
      })
    ).toEqual(excpetedState)
  })

})
