import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  language: require('./languageReducer.jsx').default
})

export default rootReducer
