import React, { Component } from 'react'
import AssetLoader from './AssetLoader'
import Avatars from './Avatars'
import ParticleSystem from 'aframe-particle-system-component'
import { vecToStr } from '../utils'

import { initScene, makeKnots, animate
	   , setAmbientLightA, setAmbientLightB
	   , makeRotatingLightX, makeRotatingLightY
	   , updateKnotColor, updateLightColor, updateLightRotationRate, updatePath } from './knots.js'

const Avatar = (props) => {
	return (
		<a-entity position={vecToStr(props.position)}>
			<a-torus radius="1" opacity="0.7" metalness="1" spherical-env-map="#tiedye" />
		</a-entity>
	)
}

export default class Knots extends Component {

	constructor(props) {
		super()

		this.state = {
			numKnots: 60,
			colorA: '#ff6600', // yellow
			colorB: '#993300' , // burnt orange
			colorC: '#FFFFFF',
			colorD: '#FFFFFF',
			rate: 0.0005,
			path: 'trig'
		}
	}

	componentDidMount() {
		initScene()
		makeKnots(this.state.numKnots)
		setAmbientLightA(this.state.colorA)
		setAmbientLightB(this.state.colorB)
		makeRotatingLightX()
		makeRotatingLightY()
		animate()
	}

	componentWillReceiveProps() {
		// hashes for translating emotion to color values
		let emotionColorsA = {
			anger: '#ff0000',     // red
	    		surprise: '#CC0033',  // pink
	    		sadness: '#3366ff',   // blue
	    		fear: '#333300',      // dark olive gray
	    		joy: '#FFFFFF'        // white
		}

		let emotionColorsB = {
			anger: '#FF6600', // orange    
			surprise: '#ffcc66', // pink
			sadness: '#003366', // dark blue
			fear: '#666633', // olive green
			joy: '#FFFFFF' // burnt orange
		}

		let emotionColorsC = {
			anger: '#ff0000', // red    
			surprise: '#FF6600', // pink
			sadness: '#00cc00', // green
			fear: '#330000', // dark green
			joy: '#FFFFFF' // white
		}

		let emotionColorsD = {
			anger: '#FF6600', // orange    
			surprise: '#FF66FF', // pink
			sadness: '#330000', // brown
			fear: '#330000', // brown
			joy: '#FFFFFF' // white
		}

		// translate emotion to color and set color on state
		let emotion = this.props.currEmotion

		let nextColorA = emotionColorsA[emotion]
		let nextColorB = emotionColorsB[emotion]
		let nextColorC = emotionColorsC[emotion]
		let nextColorD = emotionColorsD[emotion]
		let prevColorA = this.state.colorA
		let prevColorB = this.state.colorB
		let prevColorC = this.state.colorC
		let prevColorD = this.state.colorD

		let colorA = prevColorA !== nextColorA ? nextColorA : prevColorA
		let colorB = prevColorB !== nextColorB ? nextColorB : prevColorB
		let colorC = prevColorC !== nextColorC ? nextColorC : prevColorC
		let colorD = prevColorD !== nextColorD ? nextColorD : prevColorD

		// translate emotional intensity to rotation rate and set rate on state
		let intensity = this.props.primaryIntensity || 0.5

		// 0   1
		let prevRate = this.state.rate
		let nextRate = (1 - intensity) / 1000 + 0.003
		// let nextRate = (1 - intensity) * -4000 <-- flips sense of numbers

		let rate = prevRate !== nextRate ? nextRate : prevRate

		this.setState({ colorA: colorA, colorB: colorB, colorC: colorC, colorD: colorD, rate: rate })

		updateKnotColor(this.state.colorA, this.state.colorB)
		updateLightColor(this.state.colorC, this.state.colorD)
		updateLightRotationRate(this.state.rate)
	}

	render() {
		let roster = {
		    a: {},
		    b: {},
		    c: {},
		    d: {},
		    e: {},
		    f: {},
		}

		return (
			<div>
				<a-scene fog="type: exponential; color: purple">
					<AssetLoader />
					<Avatars Avatar={Avatar} roster={roster} />

					{/* Camera */}
					<a-entity id="camera" position="0 0 -10" mouse-cursor="">
						<a-camera fov="45" user-height="0" />
					</a-entity>

					{/* Skysphere */}
					<a-sky id="sky" src="#tiedye"></a-sky>

				</a-scene>
			</div>
	  	)
	}
}
