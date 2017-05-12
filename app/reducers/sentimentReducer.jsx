
const initialState = {
    primaryEmotion: [],
    intensity: [],
    personality: []
}

/* ------------------    ACTIONS    ------------------ */
export const UPDATE_EMOTION = "UPDATE_EMOTION"
export const UPDATE_INTENSITY = "UPDATE_INTENSITY"          // 'sentiment' = 'intensity'
export const UPDATE_PERSONALITY = "UPDATE_PERSONALITY"


/* ------------------    ACTION CREATORS    ------------------ */
// Take sentiment analysis data sent back from server upon calling receiveSentiment()

export const updateEmotion = (primaryEmotion) => {
    console.log('you hit the updateEmotion action creator!')
    return {
        type: UPDATE_EMOTION,
        payload: primaryEmotion
    }
}

export const updateIntensity = (intensityData) => {
    return {
        type: UPDATE_INTENSITY,
        payload: intensityData
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
        // if (newState.primaryEmotion[0] !== action.payload) {
            newState.primaryEmotion = [action.payload, ...newState.primaryEmotion]
        
            break

        case UPDATE_INTENSITY:
            newState.intensity = action.payload
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






