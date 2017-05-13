
const initialState = {
  primaryEmotion: [],
  secondaryEmotion: [],
  primaryIntensity: [],
  secondaryIntensity: [],
  personality: []
}

/* ------------------    ACTIONS    ------------------ */
export const UPDATE_EMOTION = "UPDATE_EMOTION"
export const UPDATE_INTENSITY = "UPDATE_INTENSITY"          // 'sentiment' = 'intensity'
export const UPDATE_PERSONALITY = "UPDATE_PERSONALITY"


/* ------------------    ACTION CREATORS    ------------------ */
// Take sentiment analysis data sent back from server upon calling receiveSentiment()

export const updateEmotion = (primaryEmotion, secondaryEmotion) => {
  return {
    type: UPDATE_EMOTION,
    primary: primaryEmotion,
    secondary: secondaryEmotion
  }
}

export const updateIntensity = (primaryIntensity, secondaryIntensity) => {
  return {
    type: UPDATE_INTENSITY,
    primary: primaryIntensity,
    secondary: secondaryIntensity,
  }
}

export const updatePersonality = (personalityData) => {
  return {
    type: UPDATE_PERSONALITY,
    payload: personalityData
  }
}


/* ------------------    REDUCERS    ------------------ */

export default function sentimentReducer (state = initialState, action) {

  const newState = Object.assign({}, state)

  switch (action.type) {
    case UPDATE_EMOTION:
      newState.primaryEmotion = [action.primary, ...newState.primaryEmotion]
      newState.secondaryEmotion = [action.secondary, ...newState.secondaryEmotion]
      break

    case UPDATE_INTENSITY:
      newState.primaryIntensity = [action.primary, ...newState.primaryIntensity]
      newState.secondaryIntensity = [action.secondary, ...newState.secondaryIntensity]
      break

    case UPDATE_PERSONALITY:
      newState.personality = action.payload
      break

    default:
      return state
  }

  return newState
}


/* ------------------    DISPATCHERS    ------------------ */






