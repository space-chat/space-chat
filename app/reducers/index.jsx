import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  language: require('./languageReducer.jsx').default,
  sentiment: require('./sentimentReducer.jsx').default
})

export default rootReducer
