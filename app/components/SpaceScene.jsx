import React, { Component } from 'react'
import Avatar from './Avatar'
import AssetLoader from './AssetLoader'
import { createMoon, createStar } from '../aframe/stars.js'

/*const animate = (skyColor, prevSkyColor) => {
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
}*/

// const getRandCoord = () => {
//   var coord = Math.random() * 60
//   return Math.random() < 0.5 ? coord + 5 : coord * -1 - 5
// }


export default class SpaceScene extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    createMoon()
  }

  // get primary emotion from props, convert it to color for sky animation
  // let emotionColors = {
  //   anger: '#FF0000',     // red
  //   surprise: '#FF8300',  // orange
  //   sadness: '#20A7D2',   // blue
  //   fear: '#494850',      // dark grey
  //   joy: '#FBFF00'        // yellow
  // }

  // let skyColor = emotionColors[props.currEmotion]
  // let prevSkyColor = emotionColors[props.prevEmotion]

  // console.log('skyColor is', skyColor, 'prevSkyColor is', prevSkyColor)

  render() {
    let emotionColors = {
      anger: '#FF0000',     // red
      surprise: '#FF8300',  // orange
      sadness: '#20A7D2',   // blue
      fear: '#494850',      // dark grey
      joy: '#FBFF00'        // yellow
    }
    let skyColor = emotionColors[this.props.currEmotion]

    return (
      <div>
        <a-scene>
          <AssetLoader />

          {/* ------ Placeholder Avatar ------- */}
          <a-sphere
            id="avatar"
            position="0 3 -8"
            rotation="0 -90 -10"
            radius="1.75"
            material="src: #spaceman"
            color="white" />

          {/* ----- Light shining on avatar ----- */}
          <a-light
            color="red"
            angle="45"
            position="-1 1 0"
            type="spot"
            target="avatar" />

          {/* ------ Stars ------- */}

          {/*<a-sphere
          id="star"
          position="0 7.5 -9"
          radius="0.1"
          color="#FFF"
          shader="flat"
          light="color: #DDDDFF; distance: 120; intensity: 1; type: diffuse"
        />*/}

          {/*{() => {
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
        }}*/}

          {/* ------ Sky ------ */}
          <a-sky
            id="sky"
            src="#stars"
            color={skyColor} />

        </a-scene>
      </div>
    )
  }
}

// <Avatar position="-1.5 1 -4" />
