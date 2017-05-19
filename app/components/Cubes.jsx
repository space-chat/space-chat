import React, {Component} from 'react'
import AssetLoader from './AssetLoader'

import { initScene, makeCubes, makeLight, animate, updateColor, updateSpeed, updateDirection, stopAnimating } from './cubes.js'


export default class Cubes extends Component {

  constructor(props) {
    super()

    this.state = {
      numCubes: 150,
      cubeImages: ['#deer', '#gh', '#roses', '#rainbow', '#blossoms'],
      color: ['#FFFFFF', 1], // will update based on primary emotion
      speed: 1, // will update based on sentiment analysis
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
    console.log('props are', this.props)

    let emotionColors = {
      anger: ['#FF3333', 3],
      surprise: ['#ff66cc', 4],
      sadness: ['#0066ff', 1],
      fear: ['#99CC00', 2],
      joy: ['#FFFFFF', 1],
    }

    //compare current colors/emotion
    let currentColor = this.state.color
    let currentSpeed = this.state.speed

    let emotion = this.props.currEmotion
    let sentiment = this.props.sentimentScore
    
    let nextSpeed = this.props.sentimentScore / 100 

    let color = currentColor !== emotionColors[emotion] ? emotionColors[emotion] : currentColor

    let speed = currentSpeed !== nextSpeed ? nextSpeed : currentSpeed
    console.log('speed is', speed)

    let direction = sentiment > 0.5 ? 'clockwise' : 'counter-clockwise'

    this.setState({ color: color, speed: speed, direction: direction })

    updateColor(this.state.color, this.state.intensity)
    updateSpeed(this.state.speed)
    updateDirection(this.state.direction)

  }

  componentWillUnmount() {
    stopAnimating()
  }

  render() {
    return (
      <div>
        <a-scene vr-mode-ui="enabled: true">
          <AssetLoader />

          {/* Camera */}
          <a-entity id="camera" camera="userHeight: 1.6" look-controls mouse-cursor="">
        </a-entity>

          <a-sky id="#sky" src="#fractal" />
        </a-scene>
      </div>
    )
  }
}

