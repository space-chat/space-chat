import React, { Component } from 'react'
import AssetLoader from './AssetLoader'
import Avatars from './Avatars'
import ParticleSystem from 'aframe-particle-system-component'
import { vecToStr } from '../utils'

import { initScene, makeKnots, setTargetLightA, setTargetLightB,  makeRotatingLightX, makeRotatingLightY, animate, updateColor, updateLightRotationRate } from './knots.js'

const Avatar = (props) => {
  return (
    <a-entity position={vecToStr(props.position)} particle-system={
      ['preset: dust',
        'type: sphere',
        'color: fuchsia',
        'accelerationValue: 0 0 0',
        'positionSpread: 10 10 10',
        'maxAge: 1',
        'particleCount: 100',
        'size: 0.2',
        'direction: 1',
        'velocityValue: 0.1 0.1 0.1',
        'velocitySpread: 1 1 1'
      ].join(';')} >
      <a-sphere radius="2" color="fuchsia" />
    </a-entity>
  )
}

export default class Knots extends Component {

	constructor(props) {
		super()

		this.state = {
			numKnots: 60,
			colorA: 'red', // red
			colorB: '#FF6600', // orange
			rate: 0.0005
		}
	}

	componentDidMount() {
		initScene()
		makeKnots(this.state.numKnots)
		setTargetLightA(this.state.colorA)
		setTargetLightB(this.state.colorB)
		makeRotatingLightX()
		makeRotatingLightY()
		animate()
	}

	componentWillReceiveProps() {
		// hashes for translating emotion to color values
		let emotionColorsA = {
			anger: 'red',     // red
	    	surprise: '#CC0033',  // pink
	    	sadness: 'blue',   // blue
	    	fear: '#330000',      // brown
	    	joy: 'orange'        // yellow
		}

		let emotionColorsB = {
			anger: '#FF6600', // orange    
			surprise: '#FF66FF', // pink
			sadness: 'green', // green
			fear: '#006600', // dark green
			joy: '#993300' // burnt orange
		}

		// translate emotion to color and set color on state
		let emotion = this.props.currEmotion

		let nextColorA = emotionColorsA[emotion]
		let nextColorB = emotionColorsB[emotion]
		let prevColorA = this.state.colorA
		let prevColorB = this.state.colorB

		let colorA = prevColorA !== nextColorA ? nextColorA : prevColorA
		let colorB = prevColorB !== nextColorB ? nextColorB : prevColorB

		// translate emotional intensity to rotation rate and set rate on state
		let intensity = this.props.primaryIntensity 

		let prevRate = this.state.rate
		let nextRate = (intensity - 1) * -4000 

		let rate = prevRate !== nextRate ? nextRate : prevRate

		this.setState({ colorA: colorA, colorB: colorB, rate: rate })

		updateColor(this.state.colorA, this.state.colorB)
		updateLightRotationRate(this.state.rate)
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
			<div>
        {/* temporary buttons for testing */}
        <div>
          <button onClick={() => this.handleColor()}>Change color</button>
          <button onClick={() => this.handleRate()}>Change rotation rate</button>
        </div>
        <div>
				<a-scene fog="type: exponential; color: purple">
					<AssetLoader />
					<Avatars Avatar={Avatar} roster={roster} />

					{/* Camera */}
			    <a-entity id="camera" position="0 0 20" mouse-cursor="">
			      <a-camera fov="45" user-height="0" />
			    </a-entity>

{/*					<a-assets>
		        <a-mixin id="lightA" geometry="primitive: sphere; radius: 1.5"
		                 material="color: white; shader: flat; opacity: 0.01"
		                 light="color: blue; distance: 120; intensity: 3; type: point">
		        </a-mixin>
		        <a-mixin id="lightB" geometry="primitive: sphere; radius: 2"
		                 material="color: white; shader: flat; opacity: 0.01"
		                 light="color: orange; distance: 120; intensity: 2; type: point">
		        </a-mixin>
		        <a-mixin id="torus-knot" geometry="primitive: torusKnot"
		                 material="color: red">
		        </a-mixin>
		      </a-assets>*/}

		      {/* Avatar + Targeted Lights */}
		      {/*<a-entity id="avatar"
		      geometry="primitive: torusKnot; radius: 3"
		      	position="-1 1.25 -5"
		      	material="color: white"
		      	p="5"
		      	metalness=".9"
		      	roughness="-2" />
	        <a-light id="fixedLightA" color={this.state.colorA} angle="90" radius="60" position="-3 -4 1" type="point" distance="0" intensity="3" target="avatar" />
	        <a-light id="fixedLightB" color={this.state.colorB} angle="-90" radius="60" position="2 4 1" type="point" distance="0" intensity="2" target="avatar" />

	        <a-entity id="avatar2"
		      geometry="primitive: torusKnot; radius: 2"
		      	position="15 2 -1"
		      	p="10"
		      	material="color: white"
		      	metalness=".9"
		      	roughness="-2" />
	        <a-light id="fixedLightA" color={this.state.colorA} angle="90" radius="60" position="-3 -4 1" type="point" distance="0" intensity="3" target="avatar2" />
	        <a-light id="fixedLightB" color={this.state.colorB} angle="-90" radius="60" position="2 4 1" type="point" distance="0" intensity="2" target="avatar2" />*/}

			    {/* Lights. */}
				{/* x-axis rotation */}
			    {/*<a-entity position="0 0 0">
			      <a-animation attribute="rotation" to="0 360 0"
			                   repeat="indefinite" easing="linear" dur={this.state.rate}>
			      </a-animation>
			      <a-entity mixin="lightA" position="30 0 0"></a-entity>
			    </a-entity> */}
	        {/* y-axis rotation */}
		     {/*} <a-entity position="0 0 0">
		        <a-animation attribute="rotation" to="360 0 0"
		                     repeat="indefinite" easing="linear" dur={this.state.rate}>
		        </a-animation>
		        <a-entity mixin="lightB" position="0 0 40"></a-entity>
		      </a-entity>*/}

		       {/* Skysphere */}
			    <a-sky id="sky" src="#tiedye"></a-sky>

				</a-scene>
			</div>
			</div>
	  )
	}
}
