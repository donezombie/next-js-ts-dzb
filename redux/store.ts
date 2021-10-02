import { createStore, applyMiddleware } from 'redux';
import createMiddlewareSaga from 'redux-saga';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper'

import rootSagas from './sagas';
import rootReducers from './reducers';

// setup middleware
const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...[...middleware, createLogger()]))
  }
  return applyMiddleware(...middleware)
}

export const makeStore = (context: any) => {
  const sagaMiddleware = createMiddlewareSaga()
  const store: any = createStore(rootReducers, bindMiddleware([sagaMiddleware]))

  store.sagaTask = sagaMiddleware.run(rootSagas)

  return store
}

export const wrapper = createWrapper(makeStore, { debug: true })