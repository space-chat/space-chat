import React, { Component } from 'react'
import AssetLoader from './AssetLoader'

import { initScene, makeKnots, animate, updateColor, updateRate } from './knots.js'

/* -------------
props - prevEmotion, currEmotion, prevIntensity, currIntensity
# intensity will equal duration of rotation of light mixins
# emotion will dictate colors of lights
------------- */

export default class Knots extends Component {

	constructor(props) {
		super()

		this.state = {
			numKnots: 100,
			colorA: 'blue',
			colorB: 'green',
			rate: 4000
		}

		this.handleColor = this.handleColor.bind(this)
    	this.handleRate = this.handleRate.bind(this)
	}

	componentDidMount() {
		//setLights(1200)
		//createKnot()
		//initScene()
		makeKnots(this.state.numKnots)
		animate()
	}

	componentWillReceiveProps() {
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

		let rate = {
			// data / intensity
		}

		let emotion = this.props.currEmotion
		let intensity = this.props.intensity // not final language

		let prevColorA = this.state.colorA
		let prevColorB = this.state.colorB
		let nextColorA = emotionColorsA[emotion]
		let nextColorB = emotionColorsB[emotion]

		let prevRate = this.props.rate
		let nextRate = (intensity - 1) * -4000 

		let colorA = prevColorA !== nextColorA ? nextColorA : prevColorA
		let colorB = prevColorB !== nextColorB ? nextColorB : prevColorB

		let rate = prevRate !== nextRate ? nextRate : prevRate
	}

	handleColor() {
		updateColor(this.state.colorA, this.state.colorB)
	}

	handleRate() {
		//updateLightsRate(this.state.rate)
	}

	render() {
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

					{/* Camera */}
			    <a-entity position="0 0 20">
			      <a-camera fov="45" user-height="0" />
			    </a-entity>

					<a-assets>
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
		      </a-assets>

		      {/* Avatar + Targeted Lights */}
		      <a-entity id="avatar"
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
	        <a-light id="fixedLightB" color={this.state.colorB} angle="-90" radius="60" position="2 4 1" type="point" distance="0" intensity="2" target="avatar2" />

			    {/* Lights. */}
				{/* x-axis rotation */}
			    <a-entity position="0 0 0">
			      <a-animation attribute="rotation" to="0 360 0"
			                   repeat="indefinite" easing="linear" dur={this.state.rate}>
			      </a-animation>
			      <a-entity mixin="lightA" position="30 0 0"></a-entity>
			    </a-entity>
	        {/* y-axis rotation */}
		      <a-entity position="0 0 0">
		        <a-animation attribute="rotation" to="360 0 0"
		                     repeat="indefinite" easing="linear" dur={this.state.rate}>
		        </a-animation>
		        <a-entity mixin="lightB" position="0 0 40"></a-entity>
		      </a-entity>

		       {/* Skysphere */}
			    <a-sky id="sky" src="#tiedye"></a-sky>

				</a-scene>
			</div>
			</div>
	  )
	}
}
