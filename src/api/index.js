
export const validatePhone = value => {
  return mockValition(value)
}

const successResult = {
  result: 'ok',
}

const duplicateResult = {
  result: 'duplicate',
  errorMsg: 'your phone number has been registered',
}

let mockPhones = []

function mockValition(value) {

  const delay = process.env.NODE_ENV === 'test' ? 0 : 5000

  return new Promise(
    (resolve, reject) => setTimeout(() => {resolve()}, delay)
  ).then(() => {
    if (mockPhones.includes(value)) {
      return duplicateResult
    }
    mockPhones.push(value)
    return successResult
  })
}
