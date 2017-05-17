// This component controls sphere rendering and animations of Cubes.jsx. 
// Much of this code is based on Three.js' example here:  https://github.com/mrdoob/three.js/blob/master/examples/webgl_effects_anaglyph.html

let cubes = []
// let windowHalfX = window.innerWidth / 2
// let windowHalfY = window.innerHeight / 2
// let width = window.innerWidth || 2
// let height = window.innerHeight || 2
// let mouseX = 0
// let mouseY = 0
let currentScale = 0.2
let tickSpeed = 0.00005
let directionPath = 'clockwise'

//Set up orbital camera, mouse listener, and window resize listener. 
function initScene() {
	var camera = document.getElementById('camera')
	// camera.setAttribute('fov', 60) //field of view
	// camera.setAttribute('aspect', window.innerWidth / window.innerHeight) //aspect
	// camera.setAttribute('near', 0.01) //near
	// camera.setAttribute('far', 1000) //far
	// camera.setAttribute('position', { z: 3 })
	// camera.setAttribute('focalLength', 3)

	// window.addEventListener('resize', onWindowResize, false);
	// document.addEventListener('mousemove', onDocumentMouseMove, false)
}

// Create single cube with specified material and size
const createCube = (images) => {
	let cube = document.createElement('a-box')

	// set cube position - break into helper func
	let x = (Math.random() * 401) - 200
	let y = (Math.random() * 301) - 150
	let z = (Math.random() * 301) - 150
	cube.setAttribute('position', { x: x, y: y, z: z})

	// set cube image - break into helper func
	let i = Math.floor(Math.random() * images.length)
	cube.setAttribute('material', `src: ${images[i]}`)

	// set cube size
	let j = Math.floor((Math.random() * (2)) + 1)
	cube.setAttribute('depth', j)
	cube.setAttribute('height', j)
	cube.setAttribute('width', j)

	// set cube rotation TO BE UPDATED
	// let xR = Math.random() * 180
	// let yR = Math.random() * 180
	// let zR = Math.random() * 180
	// cube.setAttribute('rotation', { x: xR, y: 0, z: zR })

	// cube.setAttribute('pivot', '0 0 0')

	// set cube id
	cubes.push(cube)
	cube.setAttribute('id', cubes.length)

	// add cubeWrapper to scene
	document.querySelector('a-scene').appendChild(cube)
}

// Create random cubes
const makeCubes = (numCubes, images) => {
	while (numCubes >= 0) {
		createCube(images)
		numCubes--
	}
	console.log('making cubes')
}

// Set light updates color based on emotion
const updateColor = (color) => {

	let light = document.createElement('a-light')

	light.setAttribute('type', 'ambient')
	light.setAttribute('color', `${color}`)
	light.setAttribute('intensity', 1)
	light.setAttribute('distance', 60)
	light.setAttribute('decay', 12)

	document.querySelector('a-scene').appendChild(light)
}


// updated speed based on intensity or a personality trait
const updateSpeed = (n) => {
	tickSpeed = n
}

// update rotation direction based on sentiment
const updateDirection = (direction) => {
	directionPath = direction
}

const animate = () => {
	requestAnimationFrame(animate)
	render()
}

const render = () => {
	let camera = document.getElementById('camera')
	let timer = tickSpeed * Date.now() //change number for cube rotation speed
	let curr = camera.getAttribute('position')
	// let addx = curr.x + ((mouseX = curr.x) * 0.05)
	// let addy = curr.y + ((- mouseY - curr.y) * 0.05)
	// camera.setAttribute('position', { x: addx, y: addy, z: 5})

	if (directionPath === 'clockwise') {
		for (let i = 0; i < cubes.length; i++) {
			let cube = cubes[i]
			cube.setAttribute('position', { x: 5 * Math.cos(timer + i) })
			cube.setAttribute('position', { y: 5 * Math.sin(timer + i * 1.1) })
		}
	} else if (directionPath === 'counter-clockwise') {
		for (let i = 0; i < cubes.length; i++) {
			var cube = cubes[i]
			cube.setAttribute('position', { x: 8 * Math.sin(timer + i + (2 * Math.PI)) })
			cube.setAttribute('position', { z: 14 * Math.cos(timer + i + 3 + (2 * Math.PI)) })
		}
	}
}

// const onWindowResize = () => {
// 	let camera = document.getElementById('cubeCamera')
// 	windowHalfX = window.innerWidth / 2;
// 	windowHalfY = window.innerHeight / 2;
// 	camera.setAttribute('aspect', window.innerWidth / window.innerHeight)
// }

// const onDocumentMouseMove = (event) => {
// 	mouseX = (event.clientX - windowHalfX) / 100;
// 	mouseY = (event.clientY - windowHalfY) / 100;
// }

module.exports = { initScene, makeCubes, animate, updateColor, updateSpeed, updateDirection}

