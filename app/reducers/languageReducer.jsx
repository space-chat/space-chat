import axios from 'axios'

// CONSTANTS
export const LANGUAGE_SET = "LANGUAGE_SET"

// ACTIONS


// ACTION CREATORS
export const setLanguage = (lang) => {
    return {
        type: LANGUAGE_SET,
        payload: lang
    }
}

// REDUCER
const languageReducer = (state = [], action) => {
    console.log(action)
    switch (action.type) {
        case LANGUAGE_SET:
            return action.payload
        default: return state
    }
}

export default languageReducer

