import React, { Component } from 'react'
import Avatar from './Avatar'
import AssetLoader from './AssetLoader'
import glMatrix, {vec3} from 'gl-matrix'

const avatarRadius = 1.75
    , sceneRadius = 8
    , cameraToCenter = vec3.fromValues(0, 0, -sceneRadius)
    
const centerScene = (cameraPosition, radius, out) => {
  return vec3.add(out, cameraPosition, cameraToCenter)
}

window.sceneRadius = sceneRadius

// Position of avatar for participant number (index). 
const positionOfAvatar = (index, totalCount, center, out) => {
  const angle = (index / totalCount) * 2 * Math.PI
      , hand = [0, 0, 0]
  vec3.rotateY(hand, cameraToCenter, [0, 0, 0], angle)
  console.log("hand", hand)
  return vec3.sub(out, center, hand)
}

const vecToStr = vec => vec.join(' ')

window.vec3 = vec3
window.glMatrix = glMatrix

const Scene = (props) => {

  // get primary emotion from props, convert it to color for sky animation 
  let emotionColors = {
    anger: '#FF0000',     // red
    surprise: '#FF8300',  // orange
    sadness: '#20A7D2',   // blue
    fear: '#494850',      // dark grey
    joy: '#FBFF00'        // yellow
  }

  let skyColor = emotionColors[props.currEmotion]
  let prevSkyColor = emotionColors[props.prevEmotion]

  let users = [1, 2, 3, 4, 5]
  let center = vec3.fromValues(0, 0, 0)
  let position = vec3.fromValues(0, 1.6, 0)
  centerScene(position, sceneRadius, center)

  const userPositions = users.map((user, i) => positionOfAvatar(i + 1, users.length + 1, center, [0, 0, 0]))
  console.log('avatar position:', center, "POSITIONS", userPositions)
  return (
      <a-scene vr-mode-ui="enabled: true">
        <AssetLoader />
        <Avatar position="-1.5 1 -4" />
        <a-sphere id="avatar" position={vecToStr(center)} radius="1.75" material="src: #blossoms" color="white" />
        <a-light color="red" light="color:red;angle:45;type:spot;target:avatar" angle="45" position="-16.717 11.189 17.925" type="spot" target="avatar" rotation="0 -18.73571990077792 -6.245239966925973" scale="1 1 1" visible="true" />
        <a-light color="red" light="angle:45;color:#f0debb;type:spot;target:null" angle="45" type="spot" target="avatar"></a-light>
       
        {
          userPositions.map(vecToStr).map(position => <a-sphere position={position} radius="1.75" color="white" material="src: #blossoms"/>)
        }
        <a-sky
          id="sky"
          src="#stars"
          color={skyColor} >
        </a-sky>

      </a-scene>
  )
}

export default Scene

