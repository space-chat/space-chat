import React from 'react'
import AssetLoader from './AssetLoader'

const animate = (cubeColor, prevCubeColor) => {
  console.log('inside animation function')
  // Animate colors if sentiment changes
  if (cubeColor !== prevCubeColor) {
    return (
        <a-animation
          begin="sentiment-change"
          attribute="material.color"
          from={prevCubeColor}
          to={cubeColor}
          ease="ease-in-circ" />
    )
  }
}

const Cubes = (props) => {
  console.log('props are', props)
  /* -----
    props {
      primaryEmotion
      secondaryEmotion
      primaryIntensity
      secondaryIntensity

      sad: #99ccff intensity 1
      mad: #ff3333 intensity 3
    }
  ----- */
  // let emotionColors = {
  //   anger: ['#FF3333', 3],
  //   surprise: ['#FF33CC', 2],
  //   sadness: ['#99CCFF', 1],
  //   fear: ['#99CC00', 2],
  //   joy: [null, 1],
  // }

  let emotionColors = {
    anger: '#FF3333',
    surprise: '#FF33CC',
    sadness: '#99CCFF',
    fear: '#99CC00',
    joy: null
  }

  let cubeColor = emotionColors[props.currEmotion]
  let prevCubeColor = emotionColors[props.prevEmotion]

  console.log('cubeColor is', cubeColor, 'prevCubeColor is', prevCubeColor)

  return (
    <div>
      <a-scene>
        <AssetLoader />
        {/* Cubes */}
        <a-box id="avatar" position="-1 1.25 -5" rotation="45 76 100" depth="3" height="3" width="3" material="src: #gh" normal-texture-repeat="50" color="white" />
        <a-box id="avatar" position="4 3.25 -10" rotation="45 76 100" depth="1.5" height="1.5" width="1.5" material="src: #cliff" color="white" />
        <a-box id="avatar" position="8 1.25 -6" rotation="45 100 68" depth="2" height="2" width="2" material="src: #deer" normal-texture-repeat="50" color="white" />
         <a-box id="avatar" position="-10 5 -8" rotation="12 128 50" depth="2" height="2" width="2" material="src: #blossoms" normal-texture-repeat="50" color="white" />

        {/* Ambient Light */}
        <a-light id="animate" type="ambient" distance="60" decay="12">
          {animate(cubeColor, prevCubeColor)}
         </a-light>

        {/* Fractal Sky */}
        <a-sky
          id="sky"
          src="#fractal" />
      </a-scene>
    </div>
  )
}

export default Cubes
