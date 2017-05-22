import React, { Component } from 'react'
import AssetLoader from './AssetLoader'
import { initScene, initSky, initLight, initStarField, initPlanets, rotatePlanets, initPlanetCircle, updateSkyColor, updateLightColor } from './space'

// Option 1: scattered, rotating planets of various sizes
// Option 2: ring of planets, each with its own orbit of small spheres
function chooseScene(option) {
  initScene()
  initSky()
  initLight()
  if (option === 1) {
    initPlanets(50)
    rotatePlanets()
  }
  if (option === 2) {
    initPlanetCircle()
  }
}

export default class Space extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    chooseScene(1)
  }

  componentWillReceiveProps() {
    let emotionColors = {
      anger:    '#FF0000',    // red
      surprise: '#FF8300',    // orange
      sadness:  '#20A7D2',    // blue
      fear:     '#494850',    // dark grey
      joy:      '#FBFF00'     // yellow
    }

    let personalityColorA = {
      default:           'white',
      agreeableness:     '#FF6666',  // salmon
      conscientiousness: 'fuchsia',
      openness:          'yellow',
      extraversion:      '#66FFFF'   // light neon blue
    }

    let personalityColorB = {
      default:           'white',
      agreeableness:     '#FFCCCC',  // light salmon-pink
      conscientiousness: 'blue',
      openness:          'orange',
      extraversion:      '#66FF33'   // light neon green
    }

    let emotion = this.props.currEmotion
    let personality = this.props.primaryPersonality

    let skyColor = emotionColors[emotion]
    let starColorA = personalityColorA[personality]
    let starColorB = personalityColorB[personality]

    updateLightColor(skyColor)
    updateSkyColor(skyColor)
    initStarField(starColorA, starColorB)
  }

  render() {
    return (
      <a-scene vr-mode-ui="enabled: true">
        <AssetLoader />

        <a-entity
          id="sceneCamera"
          camera="userHeight: 1.6"
          look-controls
          mouse-cursor="" />

        <a-entity light="type: ambient; color: #CCC"></a-entity>

      </a-scene>
    )
  }
}


