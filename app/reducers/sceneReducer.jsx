// CONSTANTS
export const SCENE_SET = 'SCENE_SET'

// ACTIONS
export const setScene = (scene) => {
  return {
    type: SCENE_SET,
    payload: scene
  }
}

// ACTION CREATORS


// REDUCER
const sceneReducer = (state = [], action) => {
  switch (action.type) {
    case SCENE_SET:
      return action.payload
    default: return state
  }
}

export default sceneReducer
