import React, {Component} from 'react'
import AssetLoader from './AssetLoader'
import Avatars from './Avatars'
import ParticleSystem from 'aframe-particle-system-component'
import { vecToStr } from '../utils'
import { initScene, initLights, initParticles, updateLightColor } from './scene'

const Avatar = (props) => {
  console.log('AVATAR PROPS', props)
  return (
    <a-entity position={vecToStr(props.position)} particle-system={
      ['preset: snow',                       // default, dust, snow, rain
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


export default class Scene extends Component {

  constructor(props) {
    super(props)

    this.state = {
      skyColor: 'white'
    }
  }

  componentDidMount() {
    initScene()
    initLights(this.state.skyColor)
    initParticles()
  }

  // This is where we can update our local state based on new props
  componentWillReceiveProps() {
    let emotionColors = {
      anger: '#FF0000',     // red
      surprise: '#FF8300',  // orange
      sadness: '#20A7D2',   // blue
      fear: '#494850',      // dark grey
      joy: '#FBFF00'        // yellow
    }

    let skyColor = emotionColors[this.props.currEmotion]

    this.setState({
      skyColor: skyColor
    })
  }

  // let skyColor = emotionColors[props.currEmotion]
  // let prevSkyColor = emotionColors[props.prevEmotion]

  render() {
    return (
      <a-scene vr-mode-ui="enabled: true">
        <AssetLoader />

        <a-entity
          id="sceneCamera"
          camera="userHeight: 1.6"
          look-controls
          mouse-cursor="" />

        <Avatars Avatar={Avatar} roster={this.props.roster} />

        {/*<a-light
          color={this.state.skyColor}
          angle="45"
          type="spot"
          target="avatar" />*/}

        {/*<a-entity position="0 0 0" particle-system={
          ['preset: snow',                       // default, dust, snow, rain
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
        </a-entity>*/}

        <a-sky
          id="sky"
          src="#stars"
          color={this.state.skyColor} />

      </a-scene>
    )
  }
}


