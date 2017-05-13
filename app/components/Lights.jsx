import React from 'react'

// functions for producting shapes in scene
var scene = document.querySelector('a-scene');
for (var i = 0; i < 120; i++) {
  var obj = document.createElement('a-entity');
  obj.setAttribute('geometry', {
    primitive: 'torusKnot',
    radius: Math.random() * 10,
    radiusTubular: Math.random() * .75,
    p: Math.round(Math.random() * 10),
    q: Math.round(Math.random() * 10)
  });
  obj.setAttribute('material', {
    color: getRandColor(),
    metalness: Math.random(),
    roughness: Math.random()
  });
  obj.setAttribute('position', {
    x: getRandCoord(),
    y: getRandCoord(),
    z: getRandCoord()
  });
  scene.appendChild(obj);
}
function getRandColor () {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function getRandCoord () {
  var coord = Math.random() * 60;
  return Math.random() < .5 ? coord + 5 : coord * -1 - 5;
}

// Component with camera, skysphere, lights
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
