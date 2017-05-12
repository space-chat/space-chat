//This component controls sphere rendering and animations of Bubbles.jsx. 
import * as THREE from 'three'

//This code is based on Three.js' example here: https://github.com/mrdoob/three.js/blob/master/examples/webgl_effects_anaglyph.html
var spheres = [];
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var width = window.innerWidth || 2;
var height = window.innerHeight || 2;
var directionalLight, pointLight;
var mouseX = 0;
var mouseY = 0;


function initScene() {
	var camera = document.getElementById('bubbleCamera')
	camera.setAttribute('fov', 60) //field of view
	camera.setAttribute('aspect', window.innerWidth / window.innerHeight) //aspect
	camera.setAttribute('near', 0.01) //near
	camera.setAttribute('far', 1000) //far
	camera.setAttribute('position', { z: 5 })
	camera.setAttribute('focalLength', 3)
}

function makeBubbles() {
	for (var i = 0; i < 200; i++) {
		var sphere = document.createElement('a-sphere')
		let x = Math.random() * 10;
		let y = Math.random() * 10;
		let z = Math.random() * 10;
		sphere.setAttribute('material', "src:#flowerSky; roughness: 0.01")
		sphere.setAttribute('position', { x: x, y: y, z: z })
		let scale = Math.random() * 1 + 0.2   //change for bubble size
		sphere.setAttribute('scale', { x: scale, y: scale, z: scale })
		document.querySelector('a-scene').appendChild(sphere);
		spheres.push(sphere);
	}

	window.addEventListener('resize', onWindowResize, false);
	document.addEventListener('mousemove', onDocumentMouseMove, false)
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

function animate() {
	requestAnimationFrame(animate);
	render();
}

function render() {
	var camera = document.getElementById('bubbleCamera')
	var timer = 0.0001 * Date.now(); //Change the number for bubble speed
	let curr = camera.getAttribute("position")
	let addx = curr.x + ((mouseX - curr.x) * .05)
	let addy = curr.y + ((- mouseY - curr.y) * .05)
	camera.setAttribute('position', { x: addx, y: addy, z: 5 })

	for (var i = 0, il = spheres.length; i < il; i++) {
		var sphere = spheres[i];
		sphere.setAttribute('position', { x: 7 * Math.cos(timer + i) }) //Change for bubble distance
		sphere.setAttribute('position', { y: 7 * Math.sin(timer + i * 1.1) })
	}
}

module.exports = { initScene, makeBubbles, animate }