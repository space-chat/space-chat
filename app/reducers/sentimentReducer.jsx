
const initialState = {
  primaryEmotion: [],
  primaryIntensity: [],
  primaryPersonality: [],
  sentimentScore: [],
  speaker: ''
}

/* ------------------    ACTIONS    ------------------ */

export const UPDATE_PRIMARY_EMO = "UPDATE_PRIMARY_EMO"
export const UPDATE_PRIMARY_INTENSITY = "UPDATE_PRIMARY_INTENSITY"
export const UPDATE_PRIMARY_PERSONALITY = "UPDATE_PRIMARY_PERSONALITY"
export const UPDATE_SENTIMENT_SCORE = "UPDATE_SENTIMENT_SCORE"
export const UPDATE_SPEAKER = "UPDATE_SPEAKER"

/* ------------------    ACTION CREATORS    ------------------ */
// Take sentiment analysis data sent back from server upon calling receiveSentiment()

export const primaryEmotion = (emotion) => {
  return {
    type: UPDATE_PRIMARY_EMO,
    payload: emotion
  }
}

export const primaryIntensity = (value) => {
  return {
    type: UPDATE_PRIMARY_INTENSITY,
    payload: value
  }
}

export const primaryPersonality = (personality) => {
  return {
    type: UPDATE_PRIMARY_PERSONALITY, 
    payload: personality
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

export default function sentimentReducer(state = initialState, action) {

  const newState = Object.assign({}, state)

  switch (action.type) {
    case UPDATE_PRIMARY_EMO:
      newState.primaryEmotion = [action.payload, ...newState.primaryEmotion]
      break

    case UPDATE_PRIMARY_INTENSITY:
      newState.primaryIntensity = [action.payload, ...newState.primaryIntensity]
      break

    case UPDATE_PRIMARY_PERSONALITY:
      newState.primaryPersonality = [action.payload, ...newState.primaryPersonality]
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






