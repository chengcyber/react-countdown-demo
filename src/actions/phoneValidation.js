import { validatePhone as validatePhoneFromAPI } from '../api'

export const PHONE_VALIDATION_REQUEST = 'app/phone_validation_request'
export const PHONE_VALIDATION_SUCCESS = 'app/phone_validation_success'
export const PHONE_VALIDATION_FAILURE = 'app/phone_validation_failure'

export const validatePhone = value => dispatch => {
  dispatch({
    type: PHONE_VALIDATION_REQUEST,
  })

  return validatePhoneFromAPI(value).then(
    res =>
      dispatch({
        type: PHONE_VALIDATION_SUCCESS,
        payload: res,
      })
    ,
    err =>
      dispatch({
        type: PHONE_VALIDATION_FAILURE,
        payload: err,
        error: true,
      })
    ,
  )
}
