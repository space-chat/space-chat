import React from 'react'
//import Avatar from './Avatar'  // not rendering
import AssetLoader from './AssetLoader'

/* -------------
props - prevEmotion, currEmotion, prevIntensity, currIntensity
# intensity will equal duration of rotation of light mixins
# emotion will dictate colors of lights
------------- */

// Component with camera, skysphere, lights
const Lights = (props) => {
  console.log('props', props.currIntensity)

	// emotion controls light color
	let emotionColorsA = {
		  anger: 'red',     // red
    	surprise: '#CC0033',  // pink
    	sadness: 'blue',   // blue
    	fear: '#330000',      // brown
    	joy: 'yellow'        // yellow
	}

	let emotionColorsB = {
		anger: '#FF6600', // orange    
		surprise: '#FF66FF', // pink
		sadness: 'green', // green
		fear: '#006600', // dark green
		joy: '#993300' // burnt orange
	}

  let colorA = emotionColorsA[props.currEmotion]
  let colorB = emotionColorsB[props.currEmotion]

  console.log('colorA', colorA, 'colorB', colorB)

// intensity controls rate of lights spinning
let rate = (props.currIntensity - 1) * -2000
console.log('rate is', rate)

// functions for producing knot shapes in scene. not working.
// adapted from: https://github.com/aframevr/aframe/blob/master/examples/showcase/dynamic-lights/index.html 
const createShapes = () => {
	console.log('inside createShapes')
	// Helper functions
	const getRandColor = () => {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
	}

	const getRandCoord = () => {
	  var coord = Math.random() * 60;
	  return Math.random() < 0.5 ? coord + 5 : coord * -1 - 5;
	}

	// Generate random knots
	for (var i=0; i<120; i++) {
	console.log('inside createShapes 2')
	  return (
			<a-entity
				geometry={`
	  			primitive: torusKnot;
	    		radius: ${Math.random() * 10};
	    		radiusTubular: ${ Math.random() * 0.75 };
	    		p: ${ Math.round(Math.random() * 10)};
	    		q: ${ Math.round(Math.random() * 10) }
	    	`}
				material={`
	    		color: ${getRandColor()};
	    		metalness: ${Math.random()};
	    		roughness: ${Math.random()}
				`}
				position={`
	    		x: ${getRandCoord()};
	    		y: ${getRandCoord()};
	    		z: ${getRandCoord()}
				`}
			/>
		)
	}
}


	return (
		<div>
	   <a-scene fog="type: exponential; color: purple">
				<AssetLoader />
				<a-assets>
	        <a-mixin id="lightA" geometry="primitive: sphere; radius: 1.5"
	                 material="color: black; shader: flat"
	                 light="color: blue; distance: 120; intensity: 2; type: point">
	        </a-mixin>
	        <a-mixin id="lightB" geometry="primitive: sphere; radius: 1.5"
	                 material="color: black; shader: flat"
	                 light="color: orange; distance: 120; intensity: 2; type: point">
	        </a-mixin>
	        <a-mixin id="torus-knot" geometry="primitive: torusKnot"
	                 material="color: red">
	        </a-mixin>
	      </a-assets>

	      {/* Attempt to generate random shapes not working
	      { createShapes() }
	    	*/}

	      {/* Avatar + Targeted Lights */}
	      <a-entity id="avatar"
	      geometry="primitive: torusKnot; radius: 3"
	      	position="-1 1.25 -5"
	      	material="color: white"
	      	metalness=".9"
	      	roughness="-2" />
        <a-light id="fixedLightA" color={colorA} angle="90" radius="60" position="-3 -4 1" type="point" distance="0" intensity="3" target="avatar" />
        <a-light id="fixedLightB" color={colorB} angle="-90" radius="60" position="2 4 1" type="point" distance="0" intensity="2" target="avatar" />

		    {/* Camera:
		    	# Position should always be placed on an entity wrapper around camera.
		    	# fov = field of view, a cone shape that deliniates what the camera sees.
		    	# user-height default is 0, when not in VR mode. In VR it is reset to approximate user height.
		    */}
		    <a-entity position="0 0 20">
		      <a-camera fov="45" user-height="0" />
		    </a-entity>

		    {/* Skysphere. */}
		    <a-entity geometry="primitive: sphere; radius: 600"
		              material="color: white"
		              scale="-1 -1 -1">
		    </a-entity>

		    {/* Lights. */}
			{/* x-axis rotation */}
		    <a-entity position="0 0 0">
		      <a-animation attribute="rotation" to="0 360 0"
		                   repeat="indefinite" easing="linear" dur={rate}>
		      </a-animation>
		      <a-entity mixin="lightA" position="30 0 0"></a-entity>
		    </a-entity>
        {/* y-axis rotation */}
	      <a-entity position="0 0 0">
	        <a-animation attribute="rotation" to="360 0 0"
	                     repeat="indefinite" easing="linear" dur={rate}>
	        </a-animation>
	        <a-entity mixin="lightB" position="0 0 40"></a-entity>
	      </a-entity>
			</a-scene>
		</div>
  )
}

export default Lights
