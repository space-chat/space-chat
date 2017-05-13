import React from 'react'

const Lights = () => {
	return (
		<div>
	   <a-scene>
	      <a-assets>
	        <a-mixin id="light" geometry="primitive: sphere; radius: 1.5"
	                 material="color: #FFF; shader: flat"
	                 light="color: #DDDDFF; distance: 120; intensity: 2; type: point">
	        </a-mixin>
	        <a-mixin id="torus-knot" geometry="primitive: torusKnot"
	                 material="color: red"></a-mixin>
	      </a-assets>

		    {/* Camera:
		    	# Position should always be placed on an entity wrapper around camera.
		    	# fov = field of view, a cone shape that deliniates what the camera sees.
		    	# user-height default is 0, when not in VR mode. In VR it is reset to approximate user height.
		    */}
		    <a-entity position="0 0 20">

		      <a-camera fov="45" user-height="0"></a-camera>
		    	}
		    </a-entity>

		    {/* Skysphere. */}
		    <a-entity geometry="primitive: sphere; radius: 600"
		              material="color: #111; shader: flat"
		              scale="-1 -1 -1"></a-entity>

		    {/* Lights. */}
		    <a-entity position="0 0 0">
		      <a-animation attribute="rotation" to="0 360 0"
		                   repeat="indefinite" easing="linear" dur="8096">
		      </a-animation>
		      <a-entity mixin="light" position="30 0 0"></a-entity>
		    </a-entity>

	      <a-entity position="0 0 0">
	        <a-animation attribute="rotation" to="360 0 0"
	                     repeat="indefinite" easing="linear" dur="8096">
	        </a-animation>
	        <a-entity mixin="light" position="0 0 40"></a-entity>
	      </a-entity>
    	</a-scene>
  	</div>
 	)
}

export default Lights
