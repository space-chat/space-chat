//This component controls sphere rendering and animations of Bubbles.jsx. 
//Some of this code is based on Three.js' example here:  https://github.com/mrdoob/three.js/blob/master/examples/webgl_effects_anaglyph.html
var spheres = [];
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var width = window.innerWidth || 2;
var height = window.innerHeight || 2;
var directionalLight, pointLight;
var mouseX = 0;
var mouseY = 0;
var defaultScale = 0.2
var tickSpeed = 0.00005
var movementPath = "trig";

//Set up orbital camera, mouse listener, and window resize listener. 
function initScene() {
	var camera = document.getElementById('bubbleCamera')
	camera.setAttribute('fov', 60) //field of view
	camera.setAttribute('aspect', window.innerWidth / window.innerHeight) //aspect
	camera.setAttribute('near', 0.01) //near
	camera.setAttribute('far', 1000) //far
	camera.setAttribute('position', { z: 5 })
	camera.setAttribute('focalLength', 3)

	window.addEventListener('resize', onWindowResize, false);
	document.addEventListener('mousemove', onDocumentMouseMove, false)
}

//Create a single bubble
function createBubble(scaleNum) {
	var sphere = document.createElement('a-sphere')
	let x = Math.random() * 10;
	let y = Math.random() * 10;
	let z = Math.random() * 10;
	sphere.setAttribute('material', "src:#flowerSky; roughness: 0.01")
	sphere.setAttribute('position', { x: x, y: y, z: z })
	let scale = Math.random() * 0.5 + scaleNum   //default is 0.2
	sphere.setAttribute('scale', { x: scale, y: scale, z: scale })
	spheres.push(sphere);
	sphere.setAttribute('id', spheres.length)
	document.querySelector('a-scene').appendChild(sphere);
}

//Create any number of bubbles with any material and level of metalness. 
function makeBubbles(numBubbles) {
	for (var i = 0; i < numBubbles; i++) {
		createBubble(defaultScale)
	}
}

//Add more bubbles to the scene
function addBubbles(numBubbles) {
	makeBubbles(numBubbles)
}

//Remove bubbles from the scene
function destroyBubbles(numBubbles) {
	for (var i = 0; i < numBubbles; i++) {
		var sphere = spheres.pop()
		document.querySelector('a-scene').removeChild(sphere)
	}
}

//Make some bubbles increase or decrease in size
function sizeBubbles(scale) {
	var n = spheres.length / 5
	destroyBubbles(n)

	for (var i = 0; i < n; i++) {
		createBubble(scale)
	}
}

//Use to increase + decrease speed, and to stop the bubbles. 
function updateSpeed(n) {
	tickSpeed = n
}

//Use to change the pattern of the bubbles: 
function updatePath(pathName) {
	movementPath = pathName
}

//bubbles increase altitude

//bubbles decrease altitude 

//bubbles light up in random colors

//bubbles increase metalness

//bubbles decrease metalness

function animate() {
	requestAnimationFrame(animate);
	render();
}

function render() {
	var camera = document.getElementById('bubbleCamera')
	var timer = tickSpeed * Date.now(); //Change the number for bubble speed
	let curr = camera.getAttribute("position")
	let addx = curr.x + ((mouseX - curr.x) * .05)
	let addy = curr.y + ((- mouseY - curr.y) * .05)
	camera.setAttribute('position', { x: addx, y: addy, z: 5 })

	if (movementPath === "trig") {
		for (var i = 0, il = spheres.length; i < il; i++) {
			var sphere = spheres[i];
			sphere.setAttribute('position', { x: 7 * Math.cos(timer + i) }) //Change for bubble distance
			sphere.setAttribute('position', { y: 7 * Math.sin(timer + i * 1.1) })
		}
	} else if (movementPath === "circleY") {
		for (var i = 0, il = spheres.length; i < il; i++) {
			var sphere = spheres[i];
			sphere.setAttribute('position', { x: 7 * Math.sin(timer + i + (2 * Math.PI)) })
			sphere.setAttribute('position', { y: 7 * Math.cos(timer + i + (2 * Math.PI)) })
		}
	} else if (movementPath === "circleZ") {
		for (var i = 0, il = spheres.length; i < il; i++) {
			var sphere = spheres[i];
			sphere.setAttribute('position', { x: 7 * Math.sin(timer + i + (2 * Math.PI)) })
			sphere.setAttribute('position', { z: 7 * Math.cos(timer + i + (2 * Math.PI)) })
		}
	}
	 else if (movementPath === "coolness") {
		for (var i = 0, il = spheres.length; i < il; i++) {
			var sphere = spheres[i];
			sphere.setAttribute('position', { x: 7 * Math.sin(timer + i * 1.1 + (2 * Math.PI)) })
			sphere.setAttribute('position', { z: 7 * Math.cos(timer + i + (2 * Math.PI)) })
		}
	} else if (movementPath === "pendulum") {
		for (var i = 0, il = spheres.length; i < il; i++) {
			var sphere = spheres[i];
			sphere.setAttribute('position', { x: 7 * Math.sin(timer + i + (2 * Math.PI)) })
			sphere.setAttribute('position', { z: 7 * Math.cos(timer + i * 2 + (2 * Math.PI)) })
		}
	}
}



// function circleAnim(ticker) {
// 	for (var i = 0, il = spheres.length; i < il; i++) {
// 		var sphere = spheres[i];

// 		sphere.setAttribute('position', { x: 7 * Math.sin(timer + (2 * Math.PI)) }) 
// 		sphere.setAttribute('position', { y: 7 * Math.cos(timer + (2 * Math.PI)) })
// 	}
// }

function onWindowResize() {
	var camera = document.getElementById('bubbleCamera')
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.setAttribute('aspect', window.innerWidth / window.innerHeight)
}

function onDocumentMouseMove(event) {
	mouseX = (event.clientX - windowHalfX) / 100;
	mouseY = (event.clientY - windowHalfY) / 100;
}


module.exports = { initScene, makeBubbles, animate, addBubbles, destroyBubbles, sizeBubbles, updateSpeed, updatePath }