
import {
  PHONE_VALIDATION_REQUEST,
  PHONE_VALIDATION_SUCCESS,
  PHONE_VALIDATION_FAILURE,
} from '../actions/phoneValidation'

export const initialState = {
  isValidating: false,
  hasValidated: false,
  result: '',
  errorMsg: '',
}

const validationReducer = (state = initialState, action) => {
  switch (action.type) {
    case PHONE_VALIDATION_REQUEST:
      return {
        ...state,
        isValidating: true,
        result: '',
        errorMsg: '',
      }
    case PHONE_VALIDATION_SUCCESS:
      return {
        ...state,
        isValidating: false,
        hasValidated: true,
        result: action.payload.result,
        errorMsg: action.payload.errorMsg,
      }
    case PHONE_VALIDATION_FAILURE:
      return {
        ...state,
        isValidating: false,
        result: action.payload.result,
        errorMsg: action.payload.errorMsg,
      }
    default:
      return state
  }
}

export default validationReducer
