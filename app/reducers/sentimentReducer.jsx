
const initialState = {
  primaryEmotion: [],
  secondaryEmotion: [],
  primaryIntensity: [],
  secondaryIntensity: [],
  extraversion: [],
  openness: [],
  conscientiousness: [],
  agreeableness: [],
  sentimentScore: []
}

/* ------------------    ACTIONS    ------------------ */
export const UPDATE_PRIMARY_EMO = "UPDATE_PRIMARY_EMO"
export const UPDATE_SECONDARY_EMO = "UPDATE_SECONDARY_EMO"
export const UPDATE_PRIMARY_INTENSITY = "UPDATE_PRIMARY_INTENSITY"
export const UPDATE_SECONDARY_INTENSITY = "UPDATE_SECONDARY_INTENSITY"
export const UPDATE_EXTRAVERSION = "UPDATE_EXTRAVERSION"
export const UPDATE_OPENNESS = "UPDATE_OPENNESS"
export const UPDATE_CONSCIENTIOUSNESS = "UPDATE_CONSCIENTIOUSNESS"
export const UPDATE_AGREEABLENESS = "UPDATE_AGREEABLENESS"
export const UPDATE_SENTIMENT_SCORE = "UPDATE_SENTIMENT_SCORE"


/* ------------------    ACTION CREATORS    ------------------ */
// Take sentiment analysis data sent back from server upon calling receiveSentiment()

export const primaryEmotion = (emotion) => {
  return {
    type: UPDATE_PRIMARY_EMO,
    payload: emotion
  }
}

export const secondaryEmotion = (emotion) => {
  return {
    type: UPDATE_SECONDARY_EMO,
    payload: emotion
  }
}

export const primaryIntensity = (value) => {
  return {
    type: UPDATE_PRIMARY_INTENSITY,
    payload: value
  }
}

export const secondaryIntensity = (value) => {
  return {
    type: UPDATE_SECONDARY_INTENSITY,
    payload: value
  }
}

export const updateExtraversion = (score) => {
  return {
    type: UPDATE_EXTRAVERSION,
    payload: score
  }
}

export const updateOpenness = (score) => {
  return {
    type: UPDATE_OPENNESS,
    payload: score
  }
}

export const updateConscientiousness = (score) => {
  return {
    type: UPDATE_CONSCIENTIOUSNESS,
    payload: score
  }
}

export const updateAgreeableness = (score) => {
  return {
    type: UPDATE_AGREEABLENESS,
    payload: score
  }
}

export const updateSentiment = (score) => {
  return {
    type: UPDATE_SENTIMENT_SCORE,
    payload: score
  }
}




/* ------------------    REDUCER    ------------------ */

export default function sentimentReducer(state = initialState, action) {

  const newState = Object.assign({}, state)

  switch (action.type) {
    case UPDATE_PRIMARY_EMO:
      newState.primaryEmotion = [action.payload, ...newState.primaryEmotion]
      break

    case UPDATE_SECONDARY_EMO:
      newState.secondaryEmotion = [action.payload, ...newState.secondaryEmotion]
      break

    case UPDATE_PRIMARY_INTENSITY:
      newState.primaryIntensity = [action.payload, ...newState.primaryIntensity]
      break

    case UPDATE_SECONDARY_INTENSITY:
      newState.secondaryIntensity = [action.payload, ...newState.secondaryIntensity]
      break

    case UPDATE_EXTRAVERSION:
      newState.extraversion = [action.payload, ...newState.extraversion]
      break

    case UPDATE_OPENNESS:
      newState.openness = [action.payload, ...newState.openness]
      break

    case UPDATE_CONSCIENTIOUSNESS:
      newState.conscientiousness = [action.payload, ...newState.conscientiousness]
      break

    case UPDATE_AGREEABLENESS:
      newState.agreeableness = [action.payload, ...newState.agreeableness]
      break

    case UPDATE_SENTIMENT_SCORE:
      newState.sentimentScore = [action.payload, ...newState.sentimentScore]
      break

    default:
      return state
  }

  return newState
}






