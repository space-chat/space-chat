import axios from 'axios'

//CONSTANTS

export const GOT_ANALYSIS = "GOT_ANALYSIS"

//Actions

export const gotAnalysis = (res) => {
    return {
        type: GOT_ANALYSIS, 
        payload: res.data
    }
}

//there may also be a broadcastSentiment...which would broadcast the latest sentiment data to all users in the room. 

//Action Creators

// export const sendForAnanlysis = (text) => {
//     return dispatch => 
//     axios.post('/api/sentiment', {text})
//     .then((res) => dispatch(gotAnalysis(res)))
//     .catch(console.error)
//}

export const sendForAnalysis = (text) => {
    const res = axios.post('/api/sentiment', { text })
    console.log("RESSSS")
    return {
        type: GOT_ANALYSIS,
        payload: res
    }
}

//Perhaps the sentiment store could be more complex...keeping seperate entries for different emotions, etc. 
const sentimentReducer = (state = [], action) => {
    console.log(action)
    switch (action.type) {
        case GOT_ANALYSIS:
            return [...state, action.payload]
        default: return state
    }
}

export default sentimentReducer;

