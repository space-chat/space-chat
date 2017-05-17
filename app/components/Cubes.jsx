import React, {Component} from 'react'
import AssetLoader from './AssetLoader'

import { initScene, makeCubes, animate, updateColor, updateSpeed, updateDirection } from './cubes.js'


export default class Cubes extends Component {

  constructor(props) {
    super()

    this.state = {
      numCubes: 350,
      cubeImages: ['#deer', '#gh', '#roses', '#rainbow', '#blossoms'],
      color: '#99CC00', // will update based on primary emotion
      speed: 0, // will update based on sentiment analysis
      direction: 'clockwise' // will update based on sentiment analysis
    }

    this.handleColor = this.handleColor.bind(this)
    //this.handleSpeed = this.handleSpeed.bind(this)
    //this.handleDirection = this.handleDirection.bind(this)
  }

  componentDidMount() {
    initScene()
    // setLight('white')
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

  componentWillReceiveProps() {
    let emotionColors = {
      anger: ['#FF3333', 3],
      surprise: ['#ffcc99', 4],
      sadness: ['#ff8533', 1],
      fear: ['#99CC00', 2],
      joy: [null, 1],
    }

  //compare current colors/emotion
  let currentColor = this.state.color
  let currentSentiment = this.state.speed

  let emotion = this.props.currEmotion
  let sentiment = this.props.sentimentScore

  let color
  let speed
  let direction

  color = currentColor !== emotionColors[emotion] ? emotionColors[emotion] : this.state.color

  sentiment = currentSentiment !== sentiment ? sentiment : this.state.speed

  direction = sentiment > 0.5 ? 'clockwise' : 'counterclockwise'

  this.setState({ color: color, speed: sentiment, direction: direction })

  updateDirection(this.state.direction)

  //console.log('cubeColor is', cubeColor, 'prevCubeColor is', prevCubeColor)
}

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

          {/* Camera */}
          <a-entity 
            id="camera"
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

