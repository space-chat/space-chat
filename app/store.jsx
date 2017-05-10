import { createStore, applyMiddleware } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
import {createLogger} from 'redux-logger'
// import thunkMiddleware from 'redux-thunk'
import promise from 'redux-promise'

import rootReducer from './reducers/index.jsx'

const store = createStore(rootReducer, applyMiddleware(createLogger(), promise))

export default store
