import { createSelector } from 'reselect'

const validationPath = 'validation'

const validationSelector = state => state[validationPath]

const getPhoneValidation = createSelector(
  validationSelector,
  (vaidation) => vaidation,
)

export default getPhoneValidation
