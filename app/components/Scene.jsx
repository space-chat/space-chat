import React, { Component } from 'react'
import Avatar from './Avatar'
import AssetLoader from './AssetLoader'
import glMatrix, {vec3} from 'gl-matrix'
import ParticleSystem from 'aframe-particle-system-component'

const avatarRadius = 1.75
    , avatarCircleRadius = 8
    , cameraToCenter = vec3.fromValues(0, 0, -avatarCircleRadius)
    
const centerScene = (cameraPosition, radius, out) => {
  return vec3.add(out, cameraPosition, cameraToCenter)
}

// window.avatarCircleRadius = avatarCircleRadius

// Position of avatar for participant number (index)
const positionOfAvatar = (index, totalCount, center, out) => {
  const angle = (index / totalCount) * 2 * Math.PI
      , hand = [0, 0, 0]
  vec3.rotateY(hand, cameraToCenter, [0, 0, 0], angle)
  console.log("hand", hand)
  return vec3.sub(out, center, hand)
}

const vecToStr = vec => vec.join(' ')

// window.vec3 = vec3
// window.glMatrix = glMatrix

/*const animate = (skyColor, prevSkyColor) => {
  if (skyColor !== prevSkyColor) {
    return (
     <a-animation
        begin="sentiment-change"
        attribute="material.color"
        from={prevSkyColor}
        to={skyColor}
        ease="ease-in-circ" />
    )
  }
}*/


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
  centerScene(position, avatarCircleRadius, center)

  const userPositions = users.map((user, i) => positionOfAvatar(i, users.length, center, [0, 0, 0]))
      , myPosition = userPositions[0]
  console.log('avatar position:', center, "POSITIONS", userPositions)

  // const particles = (style) => Object.keys(style).map(key => `${key}: ${style[key]}`).join(';')

  return (
      <a-scene vr-mode-ui="enabled: true">
        <AssetLoader />
        <Avatar position="-1.5 1 -4" />
        {/*<a-sphere id="avatar" position={vecToStr(center)} radius="1.75" material="src: #blossoms" color="white" />*/}
        {/*<a-entity particle-system="preset: dust" position={vecToStr(center)}></a-entity>*/}

        <a-entity position={vecToStr(center)} particle-system={
                  ['preset: dust',
                   'type: sphere',
                   'color: fuchsia',
                   'accelerationValue: 0 0 0',
                   'positionSpread: 0.01 0.01 0.01',
                   'maxAge: 1',
                   'particleCount: 100',
                   'size: 0.2',
                   'direction: 1',
                   'velocityValue: 0.1 0.1 0.1',
                   'velocitySpread: 1 1 1'
                   ].join(';')} >
            <a-sphere radius="0.1" color="fuchsia" />
          </a-entity>

        <a-light color="red" light="color:red;angle:45;type:spot;target:avatar" angle="45" position="-16.717 11.189 17.925" type="spot" target="avatar" rotation="0 -18.73571990077792 -6.245239966925973" scale="1 1 1" visible="true" />
        <a-light color="red" light="angle:45;color:#f0debb;type:spot;target:null" angle="45" type="spot" target="avatar"></a-light>
       
        {
          userPositions
            .map(vecToStr)
            .map((position, index) =>
              index 
              ? <a-entity key={position} position={position} particle-system={
                  ['preset: dust', // default, dust, snow, rain
                   'type: 2', // 1 (box), 2(sphere), 3(disc)
                   'accelerationValue: 0 0 0',
                   'accelerationSpread: 0 10 0',
                   'positionSpread: 8 8 8',
                   'color: white,black',
                   'maxAge: 1',
                   'size: 0.25',
                   'blending: 2',
                   'direction: 1',
                   'velocityValue: 5 5 5',
                   'velocitySpread: 8 8 8',
                   'rotationAxis: y',
                   // rotationAngle: 0; dust preset is 3.14
                   'particleCount: 50000'
                   ].join(';')} >
                  <a-sphere radius="1.75" color="white" material="src: #blossoms" />
                </a-entity>
              : null)
        }
        <a-sky
          id="sky"
          src="#stars"
          color={skyColor} />

      </a-scene>
  )
}

export default Scene

