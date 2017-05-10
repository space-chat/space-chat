import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  sentiment: require('./sentimentReducer.jsx').default
})

export default rootReducer
