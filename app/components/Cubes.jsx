import React, {Component} from 'react'
import AssetLoader from './AssetLoader'

import { initScene, makeCubes, animate, addCubes, destroyCubes, sizeOrColor, updateSpeed, updatePath } from './cubes.js'


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

    this.state={
      sky: '#fractal',
      color: 'blue',
      scale: 1
    }

   this.handleAdd = this.handleAdd.bind(this)
    this.handleSubtract = this.handleSubtract.bind(this)
    this.handleSizeOrColor = this.handleSizeOrColor.bind(this)
    this.handleSpeed = this.handleSpeed.bind(this)
    this.handlePath = this.handlePath.bind(this)
    this.handleAltitude = this.handleAltitude.bind(this)
  }

  componentDidMount() {
    initScene()
    makeCubes(60, this.state.sky)
    animate()
  }

  handleAdd() {
    addCubes(60, this.state.sky)
  }

  handleSubtract() {
    destroyCubes(30)
  }

  handleSizeOrColor() {
    sizeOrColor(this.state.scale, this.state.sky, this.state.color)
  }

  // Default speed is 0.0005
  handleSpeed(n) {
    updateSpeed(n)
  }

  // make cubes reverse spin direction based on sentiment
  handlePath(name) {
    updatePath(name)
  }

  // cubes spin in place on random axes 
  // emotion - color and color intensity (controlled via ambient light)
  // sentiment - rotation direction
  // agreeableness - cubes spin more quickly

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
  render() {
    return (
      <div>
        <div>
          <button onClick={this.handleAdd}>Add cubes</button>
          <button onClick={this.handleSubtract}>Subtract cubes</button>
          <button onClick={this.handleSizeOrColor}>Size cubes</button>
          <button onClick={() => this.handleSpeed(0.001)}>Change rotation speed</button>
          <button onClick={() => this.handlePath("pendulum")}>Change rotation direction</button>
        </div>
        <a-scene vr-mode-ui="enabled: true">
          <AssetLoader />
          <a-entity id="cubeCamera" 
            camera="userHeight: 1.6"
            look-controls
            orbit-controls="autoRotate: false; target: #pink; enableDamping: true; dampingFactor: 0.25; rotateSpeed:0.14; minDistance:3; maxDistance:15;" 
            mouse-cursor="">
          </a-entity>
          <a-sphere position="-1 1.25 -5" radius="0.001" color="#EF2D5E" id="pink">
          </a-sphere>
          <a-sky src="#fractal"></a-sky>

          {/* Cubes */}
          {/* <a-box id="avatar" position="-1 1.25 -5" rotation="45 76 100" depth="3" height="3" width="3" material="src: #gh" normal-texture-repeat="50" color="white"> </a-box>
          <a-box id="avatar" position="4 3.25 -10" rotation="45 76 100" depth="1.5" height="1.5" width="1.5" material="src: #cliff" color="white" />
          <a-box id="avatar" position="8 1.25 -6" rotation="45 100 68" depth="2" height="2" width="2" material="src: #deer" normal-texture-repeat="50" color="white" />
           <a-box id="avatar" position="-10 5 -8" rotation="12 128 50" depth="2" height="2" width="2" material="src: #blossoms" normal-texture-repeat="50" color="white" /> */}

          {/* Ambient Light */}
          {/* <a-light id="animate" type="ambient" color={cubeColor[0]} intensity={cubeColor[1]}distance="60" decay="12" /> */}

          {/* Fractal Sky */}
          {/* <a-sky
            id="sky"
            src="#fractal" /> */}
        </a-scene>
      </div>
    )
  }
}

