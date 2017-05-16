import React, { Component } from 'react'
import Avatar from './Avatar'
import AssetLoader from './AssetLoader'
import { initScene, createMoon, createStar, render } from '../utils/stars.js'

/* Goals:

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

  // Bubbles sentiment changes
  
    //Emotions: Change bubble color
        //Anger: Bubbles turn red + increase speed
        //Joy:   Bubbles turn yellow  
        //Sadness: Bubbles turn blue + decrease in #
        //Fear:    Bubbles turn gray + stand still
        //Surprise: Bubbles turn orange and increase in #
    //Personality: 
        //Extraversion: Bubbles increase in size and do a "trig"
        //Conscientiousness: Bubbles do a "coolness" pattern
        //Openness: Bubbles do a circleZ pattern
        //Agreeableness: Bubbles do a "pendulum" pattern 

*/


export default class SpaceScene extends Component {

  // Bubbles constructor
    //       this.state = {
    //         sky: '#flowerSky',
    //         color: 'white',
    //         scale: 0.7,
    //         personality: 'default',
    //         pattern: 'trig'
    //     }

    //     this.handleSizeOrColor = this.handleSizeOrColor.bind(this)
    // }

  constructor() {
    super()
  }

  // Bubbles componentDidMount
    //   componentDidMount() {
    //     initScene()
    //     makeBubbles(200, this.state.sky, this.state.color)
    //     animate()
    // }
  componentDidMount() {
    initScene()
    createMoon()
    render()
  }

  // Bubbles componentWillReceiveProps


    //   componentWillReceiveProps() {
    //     let emotionColors = {
    //         anger: '#FF0000',     // red
    //         surprise: '#FF8300',  // orange
    //         sadness: '#20A7D2',   // blue
    //         fear: '#494850',      // dark grey
    //         joy: '#FBFF00'        // yellow
    //     }

    //     //Movement depends on the dominant personality
    //     let movement = {
    //         extraversion: "trig",
    //         conscientiousness: "coolness",
    //         openness: "circleZ",
    //         agreeableness: "pendulum"
    //     }

    //     //Compare current colors/personality with previous ones
    //     let currentColor = this.state.color
    //     let currentPers = this.state.personality
    //     let emotion = this.props.currEmotion
    //     let personality = this.props.primaryPersonality
    //     let color;
    //     let domPersonality;
    //     let scale;

    //     color = currentColor !== emotionColors[emotion] ? emotionColors[emotion] : this.state.color

    //     domPersonality = currentPers !== personality ? personality : this.state.personality

    //     let pattern = movement[domPersonality] || "trig"
    //     //Bubbles are bigger if the dominant personality is extraversion
    //     scale = domPersonality === "extraversion" ? 0.7 : 0.4

    //     //Set color (emotion), and scale (personality), and speed (emotion)
    //     this.setState({ color: color, scale: scale, pattern: pattern }, () => {
    //         if (this.state.color !== '#FF8300') {
    //             this.handleSizeOrColor()
    //         } else {
    //             sizeOrColor(0.4, this.state.sky, "#FF8300", 3) //orange
    //             sizeOrColor(0.4, this.state.sky, "#0FB235", 4) //green
    //             sizeOrColor(0.4, this.state.sky, "#5227B2", 5) //purple
    //             sizeOrColor(0.4, this.state.sky, "#FFD437", 7) //yellow
    //         }

    //         updatePath(this.state.pattern)
    //     })
    // }
  componentWillReceiveProps() {
  }
  
  // Bubbles componentWillUpdate    
    // //Update speed depending on the emotion
    // componentWillUpdate() {
    //     if (this.state.color === "#FF0000") updateSpeed(0.0015)
    //     else if (this.state.color === "#494850") updateSpeed(0.00001)
    //     else updateSpeed(0.0007)
    // }

  componentWillUpdate() {

  }

  // Bubbles handleSizeOrColor
    //   //Handles changing for all emotions except surprise
    // handleSizeOrColor() {
    //     sizeOrColor(this.state.scale, this.state.sky, this.state.color, 3)
    // }

  handleBrightness() {

  }

  // Bubbles render
        //   return (
        //             <a-scene vr-mode-ui="enabled: true">
        //                 <a-entity id="bubbleCamera" camera="userHeight: 1.6" look-controls
        //                      orbit-controls="autoRotate: false; target: #pink; enableDamping: true; dampingFactor: 0.25; rotateSpeed:0.14; minDistance:3; maxDistance:15;" mouse-cursor="">
        //                 </a-entity>
        //                 <a-assets>
        //                     <img id="flowerSky" src="images/blossoms.jpg" />
        //                 </a-assets>
        //                 <a-sphere position="-1 1.25 -5" radius="0.001" color="#EF2D5E" id="pink"></a-sphere>
        //                 <a-sky src="#flowerSky"></a-sky>
        //             </a-scene>
        // )

  render() {

    return (
      <a-scene vr-mode-ui="enabled: true">

        <AssetLoader />

        <a-entity id="spaceCamera" camera="userHeight: 1.6" look-controls
                  orbit-controls="autoRotate: false; target: #pink; enableDamping: true; dampingFactor: 0.25; rotateSpeed:0.14; minDistance:3; maxDistance:15;"
                  mouse-cursor="" />

          <a-sky id="sky" src="#stars" />

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