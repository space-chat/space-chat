
/* --------------- GLOWING MOON AND STARS ------------------- */
// code for shaders and glowing moon is based off of: https://github.com/stemkoski/stemkoski.github.com/blob/master/Three.js/Shader-Halo.html

// TO DO LIST:
//    initScene() -- initializes scene with camera and window resize listener
//    createMoon() -- creates glowing 3D moon [OPTIONAL]
//    createStar() -- creates glowing 3D star
//    createOrbit() -- creates stardust orbit
//    animate() -- 
//    render() -- sets camera, tick speed, position of elements

//    updateOrbitSpeed() -- use this to increase or decrease speed of orbit (adjust tick speed)
//    updateOrbitPath() -- use this to make path chaotic v smooth
//    updateStarBrightness() -- use this to adjust shader applied to stars

// vertex and fragment shaders for 'glow' effect
var shaders = {
	vertexShader:
		'varying vec3 vNormal void main() { vNormal = normalize( normalMatrix * normal ); gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }',
	fragmentShader:
		'varying vec3 vNormal void main() { float intensity = pow( 0.7 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), 4.0 ); gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * intensity; }'
}


var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var width = window.innerWidth || 2;
var height = window.innerHeight || 2;

//Set up orbital camera and window resize listener
function initScene() {
    var camera = document.getElementById('spaceCamera')
	camera.setAttribute('fov', 60) //field of view
	camera.setAttribute('aspect', window.innerWidth / window.innerHeight) //aspect
	camera.setAttribute('near', 0.01) //near
	camera.setAttribute('far', 1000) //far
	camera.setAttribute('position', { z: 3 })
	camera.setAttribute('focalLength', 3)

    window.addEventListener('resize', onWindowResize, false)
}


// create a glowing 3D moon
function createMoon(img) {
    // var sphereGeo = new THREE.SphereGeometry(100, 32, 16)
	var moon = document.createElement('a-sphere')
	moon.setAttribute('scale', 'x: 100, y: 32, z: 16')

	// var moonTexture = THREE.TextureLoader( 'images/moon.jpg' )
	// var moonMaterial = new THREE.MeshBasicMaterial( { map: moonTexture } )
    // var moon = new THREE.Mesh(sphereGeo, moonMaterial)
	moon.setAttribute('material', `src:${img}`)

    document.querySelector('a-scene').appendChild(moon)

	// create custom material from shader (defined above)
	// var customMaterial = new THREE.ShaderMaterial( 
	// {
	//     uniforms: {  },
	// 	vertexShader:   document.getElementById( 'vertexShader'   ).textContent,   // this is currently located in index.html
	// 	fragmentShader: document.getElementById( 'fragmentShader' ).textContent,   // this is currently located in index.html
	// 	side: THREE.BackSide,
	// 	blending: THREE.AdditiveBlending,
	// 	transparent: true
	// }   );

	// var ballGeometry = new THREE.SphereGeometry( 120, 32, 16 );
	// var ball = new THREE.Mesh( ballGeometry, customMaterial );

    // document.querySelector('a-scene').appendChild(ball)
}

// create a glowing 3D star
function createStar() { /* code */}

function render() {
  var camera = document.getElementById('spaceCamera')

}

function onWindowResize() {
	var camera = document.getElementById('spaceCamera')
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.setAttribute('aspect', window.innerWidth / window.innerHeight)
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