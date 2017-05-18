
const initialState = {
  primaryEmotion: [],
  secondaryEmotion: [],
  primaryIntensity: [],
  secondaryIntensity: [],
  primaryPersonality: [],
  extraversion: [],
  openness: [],
  conscientiousness: [],
  agreeableness: [],
  sentimentScore: [],
  speaker: ''
}

/* ------------------    CONSTANTS    ------------------ */

export const UPDATE_PRIMARY_EMO = "UPDATE_PRIMARY_EMO"
export const UPDATE_SECONDARY_EMO = "UPDATE_SECONDARY_EMO"
export const UPDATE_PRIMARY_INTENSITY = "UPDATE_PRIMARY_INTENSITY"
export const UPDATE_SECONDARY_INTENSITY = "UPDATE_SECONDARY_INTENSITY"
export const UPDATE_PRIMARY_PERSONALITY = "UPDATE_PRIMARY_PERSONALITY"
export const UPDATE_EXTRAVERSION = "UPDATE_EXTRAVERSION"
export const UPDATE_OPENNESS = "UPDATE_OPENNESS"
export const UPDATE_CONSCIENTIOUSNESS = "UPDATE_CONSCIENTIOUSNESS"
export const UPDATE_AGREEABLENESS = "UPDATE_AGREEABLENESS"
export const UPDATE_SENTIMENT_SCORE = "UPDATE_SENTIMENT_SCORE"
export const UPDATE_SPEAKER = "UPDATE_SPEAKER"

/* ------------------    ACTIONS    ------------------ */
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

export const primaryPersonality = (personality) => {
  return {
    type: UPDATE_PRIMARY_PERSONALITY, 
    payload: personality
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

export const updateSpeaker = (speakerId) => {
  return {
    type: UPDATE_SPEAKER,
    payload: speakerId
  }
}

/* ------------------    REDUCER    ------------------ */

// 'sentimentReducer has a complexity of 10' --- should we break up into:
  // emotionReducer (for primary/secondary emotions and respective intensities), 
  // sentimentReducer (for sentiment score only),
  // and personalityReducer?

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

    case UPDATE_PRIMARY_PERSONALITY:
      newState.primaryPersonality = [action.payload, ...newState.primaryPersonality]
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

    case UPDATE_SPEAKER:
      newState.speaker = [action.payload, ...newState.speaker]
      break

    default:
      return state
  }

  return newState
}






