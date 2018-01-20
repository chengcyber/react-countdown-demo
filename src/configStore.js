import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers'

const middleware = [
  thunk,
]

// Configure the logger middleware
const logger = createLogger({
  level: 'info',
  collapsed: true,
});
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger)
}

const createStoreWithMiddleware = compose(
  applyMiddleware(...middleware)(createStore)
);

export default function configStore(initialState) {
  // Create the redux store and add middleware to it
  const configStore = createStoreWithMiddleware(
    rootReducer,
    initialState,
  )
  // Snippet to allow hot reload to work with reducers
  if(module.hot) {
    module.hot.accept(function _() {
      configStore.replaceReducer(rootReducer);
    })
  }
  return configStore
}
