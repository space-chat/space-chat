// This component controls sphere rendering and animations of Cubes.jsx. 
// Much of this code is based on Three.js' example here:  https://github.com/mrdoob/three.js/blob/master/examples/webgl_effects_anaglyph.html

let cubes = []
let windowHalfX = window.innerWidth / 2
let windowHalfY = window.innerHeight / 2
let width = window.innerWidth || 2
let height = window.innerHeight || 2
// let ambientLight
let mouseX = 0
let mouseY = 0
let currentScale = 0.2
let tickSpeed = 0.00005
let movementPath = 'clockwise'

// Set up orbital camera, mouse listener, and window resize listener

const initScene = () => {
	// let camera = document.getElementById('cubeCamera')
	// camera.setAttribute('fov', 60)
	// camera.setAttribute('aspect', window.innerWidth / window.innerHeight)
	// camera.setAttribute('near', 0.01) //near
	// camera.setAttribute('far', 1000) //far
	// camera.setAttribute('position', { z: 5 })
	// camera.setAttribute('focalLength', 3)

	//window.addEventListener('resize', onWindowResize, false);
}

// Create a single cube with specified material, scale and altitude
const createCube = (scaleNum, img) => {
	let cube = document.createElement('a-box')
	let x = (Math.random() * 60) - 30
	let y = (Math.random() * 60) - 30
	let z = (Math.random() * 60) - 30
	console.log('coordinates are', x, y, z)
	cube.setAttribute('material', `src: ${img}; roughness: 0.01`)
	cube.setAttribute('position', { x: x, y: y, z: z})
	let scale = Math.random() * 0.5 + scaleNum //default is 0.2
	cube.setAttribute('scale', { x: scale, y: scale, z: scale })
	cubes.push(cube)
	cube.setAttribute('id', cubes.length)
	document.querySelector('a-scene').appendChild(cube)
}

// Create any number of cubes with any material
const makeCubes = (numCubes, img, color) => {
	for (let i = 0; i < numCubes; i++) {
		createCube(currentScale, img, color)
	}
	console.log('making cubes')
}

// add more cubes to scene
const addCubes = (numCubes, img, color) => {
	console.log('adding cubes')
	makeCubes(numCubes, img, color)
}

// remove cubes from scene
const destroyCubes = (numCubes) => {
	for (let i = 0; i < numCubes; i++) {
		let cube = cubes.pop()
		document.querySelector('a-scene').removeChild(cube)
	}
}

// some cubes increase or decrease in size, or change color
const sizeOrColor = (scale, img, color) => {
	let n = cubes.length / 5
	destroyCubes(n)

	while (n >= 0) {
		createCube(scale, img, color)
		n--
	}
}

// Use to increase or decrease speed, or stop cubes:
const updateSpeed = (n) => {
	tickSpeed = n
}

// Use to change rotation direction of cubes:
const updatePath = (direction) => {
	movementPath = direction
}

const render = () => {
	//let camera = document.getElementById('cubeCamera')
	let timer = tickSpeed * Date.now() //change the number for cube speed
	// let curr = camera.getAttribute('position')
	// let addx = curr.x + ((mouseX = curr.x) * 0.05)
	// let addy = curr.y + ((- mouseY - curr.y) * 0.05)
	// camera.setAttribute('position', { x: addx, y: addy, z: 5})

	if (movementPath === 'clockwise') {
		// clockwise rotation logic
	} else {
		// counter-clockwise rotation logic
	}
}

const animate = () => {
	requestAnimationFrame(animate)
	render()
}

// const onWindowResize = () => {
// 	let camera = document.getElementById('cubeCamera')
// 	windowHalfX = window.innerWidth / 2;
// 	windowHalfY = window.innerHeight / 2;
// 	camera.setAttribute('aspect', window.innerWidth / window.innerHeight)
// }

module.exports = { initScene, makeCubes, animate, addCubes, destroyCubes, sizeOrColor, updateSpeed, updatePath}

