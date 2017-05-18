//This component controls sphere rendering and animations of Bubbles.jsx. 
//*Some* of this code is based on Three.js' example here:  https://github.com/mrdoob/three.js/blob/master/examples/webgl_effects_anaglyph.html

var spheres = [];
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var width = window.innerWidth || 2;
var height = window.innerHeight || 2;
var mouseX = 0;
var mouseY = 0;
var currentScale = 0.2
var tickSpeed = 0.00005
var movementPath = "trig";
var altitude = "normal"

//Set up orbital camera, mouse listener, and window resize listener. 
function initScene() {
	var camera = document.getElementById('bubbleCamera')
	camera.setAttribute('fov', 60) //field of view
	camera.setAttribute('aspect', window.innerWidth / window.innerHeight) //aspect
	camera.setAttribute('near', 0.01) //near
	camera.setAttribute('far', 1000) //far
	camera.setAttribute('position', { z: 3 })
	camera.setAttribute('focalLength', 3)

	window.addEventListener('resize', onWindowResize, false);
	document.addEventListener('mousemove', onDocumentMouseMove, false)
}

//Create a single bubble with a specified material, scale, and altitude
function createBubble(scaleNum, img, color) {
	var sphere = document.createElement('a-sphere')
	let x = Math.random() * 10;
	var y;
	if (altitude === "high") {
		y = Math.floor(Math.random() * (10 - 6 + 1) + 6)
	} else {
		y = Math.random() * 10
	}
	let z = Math.random() * 10;
	sphere.setAttribute('material', `src:${img}; roughness: 0.01; color: ${color}`)
	sphere.setAttribute('position', { x: x, y: y, z: z })
	let scale = Math.random() * 0.4 + scaleNum   //default scaleNum is 0.2
	sphere.setAttribute('scale', { x: scale, y: scale, z: scale })
	spheres.push(sphere);
	sphere.setAttribute('id', spheres.length)
	document.querySelector('a-scene').appendChild(sphere);
}

//Create any number of bubbles with any material. 
function makeBubbles(numBubbles, img, color) {
	for (var i = 0; i < numBubbles; i++) {
		createBubble(currentScale, img, color)
	}
	console.log("making!")
}

//Add more bubbles to the scene
function addBubbles(numBubbles, img, color) {
	console.log("adding!")
	makeBubbles(numBubbles, img, color)
}

//Make some bubbles increase or decrease in size, or change color
function sizeOrColor(scaleNum, img, color, int) {
	var n = spheres.length / int  //for example, every 3rd, or every 4th bubble
	var i = 0;

	while (i < n) {
		var sphere = spheres[i];
		sphere.setAttribute('material', `src:${img}; roughness: 0.01; color: ${color}`)
		let scale = Math.random() * 0.5 + scaleNum   //default is 0.2
		sphere.setAttribute('scale', { x: scale, y: scale, z: scale })
		i++; 
	}
}

//Use to increase or decrease speed, and to stop the bubbles. 
function updateSpeed(n) {
	tickSpeed = n
}

//Use to change the pattern of the bubbles: 
function updatePath(pathName) {
	movementPath = pathName
}

function animate() {
	requestAnimationFrame(animate);
	render();
}

function render() {
	var camera = document.getElementById('bubbleCamera')
	var timer = tickSpeed * Date.now(); //Change the number for bubble speed
	let curr = camera.getAttribute("position") || { x: 1, y: 1 }
	let addx = curr.x + ((mouseX - curr.x) * .05)
	let addy = curr.y + ((-mouseY - curr.y) * .05)
	camera.setAttribute('position', { x: addx, y: addy, z: 5 })

	if (movementPath === "trig") {
		for (var i = 0, il = spheres.length; i < il; i++) {
			var sphere = spheres[i];
			sphere.setAttribute('position', { x: 5 * Math.cos(timer + i) })
			sphere.setAttribute('position', { y: 5 * Math.sin(timer + i * 1.1) })
		}
	}
	else if (movementPath === "circleZ") {
		for (var i = 0, il = spheres.length; i < il; i++) {
			var sphere = spheres[i];
			sphere.setAttribute('position', { x: 8 * Math.sin(timer + i + (2 * Math.PI)) })
			sphere.setAttribute('position', { z: 14 * Math.cos(timer + i + 3 + (2 * Math.PI)) })
		}
	}
	else if (movementPath === "coolness") {
		for (var i = 0, il = spheres.length; i < il; i++) {
			var sphere = spheres[i];
			sphere.setAttribute('position', { x: 8 * Math.sin(timer + i * 1.1 + (2 * Math.PI)) })
			sphere.setAttribute('position', { z: 8 * Math.cos(timer + i + (2 * Math.PI)) })
		}
	} else if (movementPath === "pendulum") {
		for (var i = 0, il = spheres.length; i < il; i++) {
			var sphere = spheres[i];
			sphere.setAttribute('position', { x: 8 * Math.sin(timer + i + (2 * Math.PI)) })
			sphere.setAttribute('position', { z: 8 * Math.cos(timer + i * 2 + (2 * Math.PI)) })
		}
	}
}

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


module.exports = { initScene, makeBubbles, animate, addBubbles, sizeOrColor, updateSpeed, updatePath }
