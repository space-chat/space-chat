import React, {Component} from 'react'
import AssetLoader from './AssetLoader'

import { initScene, makeCubes, makeLight, animate, updateColor, updateSpeed, updateDirection } from './cubes.js'


export default class Cubes extends Component {

  constructor(props) {
    super()

    this.state = {
      numCubes: 350,
      cubeImages: ['#deer', '#gh', '#roses', '#rainbow', '#blossoms'],
      color: '#FFFFFF', // will update based on primary emotion
      speed: 0, // will update based on sentiment analysis
      direction: 'clockwise' // will update based on sentiment analysis
    }

    //this.handleColor = this.handleColor.bind(this)
    //this.handleSpeed = this.handleSpeed.bind(this)
    //this.handleDirection = this.handleDirection.bind(this)
  }

  componentDidMount() {
    initScene()
    makeLight()
    makeCubes(this.state.numCubes, this.state.cubeImages)
    animate()
  }

  componentWillReceiveProps() {
    let emotionColors = {
      anger: ['#FF3333', 3],
      surprise: ['#ffcc99', 4],
      sadness: ['#ff8533', 1],
      fear: ['#99CC00', 2],
      joy: ['#FFFFFF', 1],
    }

    //compare current colors/emotion
    let currentColor = this.state.color
    let currentSentiment = this.state.speed

    let emotion = this.props.currEmotion
    let sentiment = this.props.sentimentScore

    let color
    let speed
    let direction

    color = currentColor !== emotionColors[emotion][0] ? emotionColors[emotion][0] : this.state.color

    sentiment = currentSentiment !== sentiment ? sentiment : this.state.speed

    direction = sentiment > 0.5 ? 'clockwise' : 'counterclockwise'

    this.setState({ color: color, speed: sentiment, direction: direction })

    updateColor(this.state.color)
    updateSpeed(this.state.speed)
    updateDirection(this.state.direction)

  }

  // handleColor() {
  //   updateColor(this.state.color)
  //   console.log('ambient light color is', this.state.color)
  // }

  // // Default speed is 0.0005
  // handleSpeed() {
  //   updateSpeed(this.state.speed)
  //   console.log('speed is', this.state.speed)
  // }

  // // make cubes reverse spin direction based on sentiment
  // handleDirection() {
  //   updateDirection(this.state.direction)
  //   console.log('direction is', this.state.direction)
  // }

  render() {
    return (
      <div>
        {/* temporary buttons for testing */}
        {/*<div>
          <button onClick={() => this.handleColor()}>Change light color</button>
          <button onClick={() => this.handleSpeed()}>Change rotation speed</button>
          <button onClick={() => this.handleDirection()}>Change rotation direction</button>
        </div> */}
        <a-scene vr-mode-ui="enabled: true">
          <AssetLoader />

          {/* Camera */}
          <a-entity 
            id="camera"
            position="0 0 0"
            camera="userHeight: 1.6"
            mouse-cursor="" />


          {/* Not sure if I need this. Artifact from bubbles code. */}
          {/*<a-sphere position="-1 1.25 -5" radius="0.001" color="#EF2D5E" id="pink">
          </a-sphere> */}

          <a-sky id="#sky" src="#fractal" />
        </a-scene>
      </div>
    )
  }
}

