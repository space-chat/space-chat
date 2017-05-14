import React, {Component} from 'react'
import AssetLoader from './AssetLoader'

import { setLight, makeCubes, animate, updateColor, updateSpeed, updateDirection } from './cubes.js'


// const animate = (cubeColor, prevCubeColor) => {
//   console.log('inside animation function')
//   // Animate colors if sentiment changes
//   if (cubeColor !== prevCubeColor) {
//     return (
//         <a-animation
//           begin="sentiment-change"
//           attribute="material.color"
//           from={prevCubeColor}
//           to={cubeColor}
//           ease="ease-in-circ" />
//     )
//   }
// }

export default class Cubes extends Component {

  constructor(props) {
    super()

    this.state = {
      numCubes: 200,
      cubeImages: ['#deer', '#gh', '#roses', '#rainbow'],
      color: 'blue', // will update based on primary emotion
      speed: 0, // will update based on sentiment analysis
      direction: 'forward' // will update based on sentiment analysis
    }

    this.handleAdd = this.handleAdd.bind(this)
    this.handleColor = this.handleColor.bind(this)
    this.handleSpeed = this.handleSpeed.bind(this)
    this.handleDirection = this.handleDirection.bind(this)
  }

  componentDidMount() {
    setLight()
    makeCubes(this.state.numCubes, this.state.cubeImages)
    animate()
  }

  handleColor() {
    updateColor(this.state.color)
  }

  // Default speed is 0.0005
  handleSpeed() {
    updateSpeed(this.state.speed)
  }

  // make cubes reverse spin direction based on sentiment
  handleDirection() {
    updateDirection(this.state.direction)
  }

  /* ---------------
  Logic for translating sentiment analysis:

  // let emotionColors = {
  //   anger: ['#FF3333', 3],
  //   surprise: ['#ffcc99', 4],
  //   sadness: ['#ff8533', 1],
  //   fear: ['#99CC00', 2],
  //   joy: [null, 1],
  // }

  // let cubeColor = emotionColors[props.currEmotion]
  // let prevCubeColor = emotionColors[props.prevEmotion]

  // console.log('cubeColor is', cubeColor, 'prevCubeColor is', prevCubeColor)
  ------------------ */

  render() {
    return (
      <div>
        {/* temporary buttons for testing */}
        <div>
          <button onClick={() => this.handleColor()}>Change light color</button>
          <button onClick={() => this.handleSpeed()}>Change rotation speed</button>
          <button onClick={() => this.handleDirection()}>Change rotation direction</button>
        </div>
        <a-scene vr-mode-ui="enabled: true">
          <AssetLoader />

          {/* Camera - artifact from bubbles code. */}
          {/*<a-entity id="cubeCamera"
            camera="userHeight: 1.6"
            orbit-controls="autoRotate: false; target: #pink; enableDamping: true; dampingFactor: 0.25; rotateSpeed:0.14; minDistance:3; maxDistance:15;">
          </a-entity>*/}

          {/* Camera */}
          <a-entity position="0 0 0">
            <a-camera />
          </a-entity>

          {/* Not sure if I need this. Artifact from bubbles code. */}
          {/*<a-sphere position="-1 1.25 -5" radius="0.001" color="#EF2D5E" id="pink">
          </a-sphere> */}

          <a-sky src="#fractal" />
        </a-scene>
      </div>
    )
  }
}

