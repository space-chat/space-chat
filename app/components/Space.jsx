import React, { Component } from 'react'
import AssetLoader from './AssetLoader'
import Avatars from './Avatars'
import { initScene, createStarField, createStardust, updateSkyColor, updateStardust, updateStarField } from './space.js'
import { vecToStr } from '../utils'

/* --------------------- Goals: -----------------------
(1) SCENE SET UP:
- Avatars with orbits
   - render 2 basic avatar objects with 'ring' of stardust
   - animate stardust to orbit around each avatar
   - define each avatar as a center of gravity for orbit
- Glowing stars
   - render randomly-placed, glowing stars
- Starry sky/galaxy
   - find better stars/galaxy background (with color involved as default?)
(2) SENTIMENT CHANGES:
- primaryEmotion => sky color changes
- primaryEmotion intensity => stars glow brighter
- if primaryEmotion is joy/surprise => star dust orbit for specific avatar speeds up
- if primaryEmotion is sadness => star dust orbit slows down
- if primaryEmotion is anger => star dust orbits more chaotically
- if primaryPersonality is extraversion => avatar grows bigger
- if primaryPersonality is introversion (extraversion score is below a certain threshold) => avatar shrinks
Challenges:
- putting together existing threejs/webgl code with React component
- animating for smooth transitions between scene updates
----------------------------------------------------- */

        //   particle-system={
        //     ['preset: dust',
        //         'type: sphere',
        //         'color: fuchsia',
        //         'accelerationValue: 0 0 0',
        //         'positionSpread: 10 10 10',
        //         'maxAge: 1',
        //         'particleCount: 100',
        //         'size: 0.2',
        //         'direction: 1',
        //         'velocityValue: 0.1 0.1 0.1',
        //         'velocitySpread: 1 1 1'
        //     ].join(';')} 


const Avatar = (props) => {
    return (
        <a-entity 
          class='avatar'
          position={vecToStr(props.position)} >
          <a-sphere radius="2" color="fuchsia" />
        </a-entity>
    )
}

export default class Space extends Component {

    constructor(props) {
        super(props)

        this.state = {
            skyColor: '',
            prevSkyColor: ''
        }
    }

    componentDidMount() {
        initScene()
        createStarField({ x: 0, y: 1.600000023841858, z: -8 })
        createStardust()
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

        this.setState({
            skyColor: emotionColors[this.props.currEmotion],
            prevSkyColor: emotionColors[this.props.prevEmotion]
        })
    }

    componentWillUpdate() {
        updateSkyColor(this.state.skyColor, this.state.prevSkyColor)
        updateStardust()
        updateStarField()
    }

    render() {

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

                <a-light
                  color="red"
                  light="color:red;angle:45;type:spot;target:avatar"
                  angle="45"
                  position="-16.717 11.189 17.925"
                  type="spot"
                  target="avatar"
                  rotation="0 -18.73571990077792 -6.245239966925973"
                  scale="1 1 1"
                  visible="true" />

                <a-light
                  color="red"
                  light="angle:45;color:#f0debb;type:spot;target:null"
                  angle="45"
                  type="spot"
                  target="avatar" />

                <a-sky
                    id="sky"
                    src="#stars"
                    color={this.state.skyColor} />

            </a-scene>
        )
    }
}




/* ----------------------- OLD CODE: -------------------------
// getRandCoord for stars
  const getRandCoord = () => {
    var coord = Math.random() * 60
    return Math.random() < 0.5 ? coord + 5 : coord * -1 - 5
  }
----------------
// Animate function for skyColor change:
  const animate = (skyColor, prevSkyColor) => {
    if (skyColor !== prevSkyColor) {
      return (
       <a-animation
          begin="sentiment-change"
          attribute="material.color"
          from={prevSkyColor}
          to={skyColor}
          ease="ease-in-circ" />
      )
    }
  }
----------------
// Assigning sky color based on primary emotion:
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
  console.log('skyColor is', skyColor, 'prevSkyColor is', prevSkyColor)
-----------------
// Placeholder avatar:
          <a-sphere
            id="avatar"
            position="0 3 -8"
            rotation="0 -90 -10"
            radius="1.75"
            material="src: #spaceman"
            color="white" />
// Avatar component:
          <Avatar position="-1.5 1 -4" />
// Light shining on avatar:
          <a-light
            color="red"
            angle="45"
            position="-1 1 0"
            type="spot"
            target="avatar" />
// Single star:
        <a-sphere
          id="star"
          position="0 7.5 -9"
          radius="0.1"
          color="#FFF"
          shader="flat"
          light="color: #DDDDFF; distance: 120; intensity: 1; type: diffuse"
        />
// Multiple stars:
          {() => {
          var scene = document.querySelector('a-scene')
          for (var i = 0; i < 120; i++) {
            var obj = document.createElement('a-entity')
            obj.setAttribute('geometry', {
              primitive: 'sphere',
              radius: 1
            })
            obj.setAttribute('material', {
              color: '#FFF',
              shader: 'flat'
            })
            obj.setAttribute('light', {
              color: '#DDDDFF',
              distance: 120,
              intensity: 1.5,
              type: 'point'
            })
            obj.setAttribute('position', {
              x: getRandCoord(),
              y: getRandCoord(),
              z: getRandCoord()
            })
            scene.appendChild(obj)
          }
        }}
------------------------------------------------------------------ */
