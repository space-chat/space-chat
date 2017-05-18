// CONSTANTS
export const ADDED_TO_ROSTER = 'ADDED_TO_ROSTER'
export const DELETED_FROM_ROSTER = 'DELETED_FROM_ROSTER'
export const GOT_SENTIMENT = 'GOT_SENTIMENT'

// ACTIONS
export const addToRoster = (id) => {
  return {
    type: ADDED_TO_ROSTER,
    payload: id
  }
}

export const deleteFromRoster = (id) => {
  return {
    type: DELETED_FROM_ROSTER,
    payload: id
  }
}

export const gotSentiment = (payload) => {
  return {
    type: GOT_SENTIMENT,
    payload
  }
}

// ACTION CREATORS


// REDUCER
const rosterReducer = (state = {}, action) => {
  let newState = Object.assign({}, state)

  switch (action.type) {

    case ADDED_TO_ROSTER:
      newState[action.payload] = {}
      return newState

    case DELETED_FROM_ROSTER:
      delete newState[action.payload]
      return newState

    case GOT_SENTIMENT:
      newState[action.payload.speaker] = action.payload
      return newState

    default: return state
  }
}

export default rosterReducer
