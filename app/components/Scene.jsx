import React from 'react'
import AssetLoader from './AssetLoader'
import Avatars from './Avatars'
import ParticleSystem from 'aframe-particle-system-component'
import { vecToStr } from '../utils'

const Avatar = (props) => {
  return (
    <a-entity position={vecToStr(props.position)} particle-system={
        [   'preset: snow',                       // default, dust, snow, rain
            'type: 2',                            // 1 (box), 2(sphere), 3(disc)
            'accelerationValue: 0 0 0',
            'accelerationSpread: 0 10 0',
            'positionSpread: 8 8 8',
            'color: white',
            'maxAge: 1',
            'size: 0.09',
            'blending: 2',
            'direction: 1',
            'velocityValue: 5 5 5',
            // 'velocitySpread: 8 8 8',
            'rotationAxis: y',
            // rotationAngle: 0; dust preset is 3.14
            'particleCount: 50000'
        ].join(';')} >
        <a-sphere radius="3" src="#moon" />
    </a-entity>
  )
}

const Scene = (props) => {

  // get primary emotion from props, convert it to color for sky animation
  let emotionColors = {
    anger: '#FF0000',     // red
    surprise: '#FF8300',  // orange
    sadness: '#20A7D2',   // blue
    fear: '#66ff33',      // dark grey
    joy: '#FBFF00'        // yellow
  }

  let skyColor = emotionColors[props.currEmotion]
  let prevSkyColor = emotionColors[props.prevEmotion]

  let roster = {
    a: {},
    b: {},
    c: {}
  }

  return (
    <a-scene vr-mode-ui="enabled: true">
      <AssetLoader />
      <Avatars Avatar={Avatar} roster={roster} prevSkyColor={skyColor} />

      <a-light color={`${skyColor}`} light="angle:45;type:spot;target:avatar" angle="45" position="-16.717 11.189 17.925" type="spot" target="avatar" rotation="0 -18.73571990077792 -6.245239966925973" scale="1 1 1" visible="true" />
      <a-light color={`${skyColor}`} light="angle:45;type:spot;target:null" angle="45" type="spot" target="avatar"></a-light>

      <a-sky
        id="sky"
        src="#stars"
        color={skyColor} />

    </a-scene>
  )
}

export default Scene

