
/* --------------- GLOWING MOON AND STARS ------------------- */
// code for shaders and glowing moon is based off of: https://github.com/stemkoski/stemkoski.github.com/blob/master/Three.js/Shader-Halo.html

import THREELib from "three-js"
// import AFRAME from "aframe"

var THREE = THREELib()

//Set up orbital camera, mouse listener, and window resize listener
function initScene() {
    var camera = document.getElementById('spaceCamera')
	camera.setAttribute('fov', 60) //field of view
	camera.setAttribute('aspect', window.innerWidth / window.innerHeight) //aspect
	camera.setAttribute('near', 0.01) //near
	camera.setAttribute('far', 1000) //far
	camera.setAttribute('position', { z: 3 })
	camera.setAttribute('focalLength', 3)

    window.addEventListener('resize', onWindowResize, false)
	document.addEventListener('mousemove', onDocumentMouseMove, false)
}


// create a glowing 3D moon
function createMoon() {
    var sphereGeo = new THREE.SphereGeometry(100, 32, 16)
	var moonTexture = THREE.TextureLoader( 'images/moon.jpg' )
	var moonMaterial = new THREE.MeshBasicMaterial( { map: moonTexture } )
    var moon = new THREE.Mesh(sphereGeo, moonMaterial)
    document.querySelector('a-scene').appendChild(moon)

	// create custom material from the shader code in <script> tags in index.html
	var customMaterial = new THREE.ShaderMaterial( 
	{
	    uniforms: {  },
		vertexShader:   document.getElementById( 'vertexShader'   ).textContent,   // this is currently located in index.html
		fragmentShader: document.getElementById( 'fragmentShader' ).textContent,   // this is currently located in index.html
		side: THREE.BackSide,
		blending: THREE.AdditiveBlending,
		transparent: true
	}   );

	var ballGeometry = new THREE.SphereGeometry( 120, 32, 16 );
	var ball = new THREE.Mesh( ballGeometry, customMaterial );

    document.querySelector('a-scene').appendChild(ball)
}

// create a glowing 3D star
function createStar() { /* code */}

function render() {

}


// AFRAME.registerComponent('star', {
//   // schema object defines and describes properties of the component
//   schema: {},

//   init: function() {
//       var el = this.el
//       var threeJSstar = // create three.js object sphere
//       el.setObject3D('mesh', threeJSstar)
//   }
// });

module.exports = { initScene, createMoon, createStar, render }