import { fetchData } from '../api';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

import {
  PHONE_VALIDATION_REQUEST,
  PHONE_VALIDATION_SUCCESS,
  PHONE_VALIDATION_FAILURE,
  validatePhone,
} from './phoneValidation'

describe('phone validation actions', () => {

  it('fire success action', () => {

    const expectedActions = [
      {
        type: PHONE_VALIDATION_REQUEST,
      },
      {
        type: PHONE_VALIDATION_SUCCESS,
        payload: {
          result: 'ok',
        },
      },
    ]
    const store = mockStore({ validation: {}})

    return store.dispatch(validatePhone('1')).then(
      () =>
        expect(store.getActions()).toEqual(expectedActions)
    )
  })

  it('duplicate phone number', () => {

    const expectedActions = [
      {
        type: PHONE_VALIDATION_REQUEST,
      },
      {
        type: PHONE_VALIDATION_SUCCESS,
        payload: {
          result: 'ok',
        },
      },
      {
        type: PHONE_VALIDATION_REQUEST,
      },
      {
        type: PHONE_VALIDATION_SUCCESS,
        payload: {
          result: 'duplicate',
          errorMsg: 'your phone number has been registered',
        },
      },
    ]
    const store = mockStore({ validation: {}})

    return store
      .dispatch(validatePhone('2'))
      .then(
        () => store.dispatch(validatePhone('1'))
      )
      .then(
        () =>
          expect(store.getActions()).toEqual(expectedActions)
      )
  })
})


