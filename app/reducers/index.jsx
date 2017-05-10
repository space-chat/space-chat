import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  sentiment: require('./sentimentReducer.jsx').default,
  language: require('./languageReducer.jsx').default
})

export default rootReducer
