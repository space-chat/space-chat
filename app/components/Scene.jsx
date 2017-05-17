import React from 'react'
import AssetLoader from './AssetLoader'
import Avatars from './Avatars'
import ParticleSystem from 'aframe-particle-system-component'
import { vecToStr } from '../utils'

const Avatar = (props) => {
  return (
    <a-entity position={vecToStr(props.position)} particle-system={
      ['preset: dust',
        'type: sphere',
        'color: fuchsia',
        'accelerationValue: 0 0 0',
        'positionSpread: 10 10 10',
        'maxAge: 1',
        'particleCount: 100',
        'size: 0.2',
        'direction: 1',
        'velocityValue: 0.1 0.1 0.1',
        'velocitySpread: 1 1 1'
      ].join(';')} >
      <a-sphere radius="2" color="fuchsia" />
    </a-entity>
  )
}

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

  let roster = {
    a: {},
    b: {},
    c: {},
    d: {},
    e: {},
    f: {}
  }

  return (
    <a-scene vr-mode-ui="enabled: true">
      <AssetLoader />
      <Avatars Avatar={Avatar} roster={roster} />

      <a-light color="red" light="color:red;angle:45;type:spot;target:avatar" angle="45" position="-16.717 11.189 17.925" type="spot" target="avatar" rotation="0 -18.73571990077792 -6.245239966925973" scale="1 1 1" visible="true" />
      <a-light color="red" light="angle:45;color:#f0debb;type:spot;target:null" angle="45" type="spot" target="avatar"></a-light>

      <a-sky
        id="sky"
        src="#stars"
        color={skyColor} />

    </a-scene>
  )
}

export default Scene

