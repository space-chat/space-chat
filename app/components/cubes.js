// This component controls sphere rendering and animations of Cubes.jsx. 
// Much of this code is based on Three.js' example here:  https://github.com/mrdoob/three.js/blob/master/examples/webgl_effects_anaglyph.html

let cubes = []
// let windowHalfX = window.innerWidth / 2
// let windowHalfY = window.innerHeight / 2
// let width = window.innerWidth || 2
// let height = window.innerHeight || 2
// let ambientLight
// let mouseX = 0
// let mouseY = 0
// let currentScale = 0.2
let tickSpeed = 0.00005
let movementPath = 'clockwise'

// Set light updates color based on emotion
const setLight = (color) => {
	let prevLight = document.querySelector('a-light')
	prevLight ? 
		document.querySelector('a-scene').removeChild(prevLight) : 
		null

	let light = document.createElement('a-light')
	light.setAttribute('id', 'animate')
	light.setAttribute('type', 'ambient')
	light.setAttribute('color', `${color}`)
	light.setAttribute('intensity', 1)
	light.setAttribute('distance', 60) 
	light.setAttribute('decay', 12)
	document.querySelector('a-scene').appendChild(light)
}

// Create a single cube with specified material, scale and altitude
const createCube = (images) => {
	let cubeWrapper = document.createElement('a-entity')
	let cube = document.createElement('a-box')
	let animation = document.createElement('a-animation')

	// set cube position
	let x = (Math.random() * 401) - 200
	let y = (Math.random() * 301) - 150
	let z = (Math.random() * 301) - 150
	cube.setAttribute('position', { x: x, y: y, z: z})

	// set cube image
	let i = Math.floor(Math.random() * images.length)
	cube.setAttribute('material', `src: ${images[i]}`)

	// set cube size
	let j = Math.floor((Math.random() * (15 - 2)) + 2)
	cube.setAttribute('depth', j)
	cube.setAttribute('height', j)
	cube.setAttribute('width', j)

	// set cube rotation
	let xR = Math.random() * 180
	let yR = Math.random() * 180
	let zR = Math.random() * 180
	cube.setAttribute('rotation', { x: xR, y: 0, z: zR })

	cube.setAttribute('pivot', '0 0 0')

	// set cube id
	//cubes.push(cube)
	//cube.setAttribute('id', cubes.length)

	// define animations
	animation.setAttribute('attribute', 'rotation')
	animation.setAttribute('dur', 10000)
	animation.setAttribute('to', `${xR - 0.001} ${yR} ${zR}`)
	animation.setAttribute('direction', 'alternate')
	animation.setAttribute('repeat', 'indefinite')
	animation.setAttribute('fill', 'both')
	animation.setAttribute('ease', 'ease-in-out-circ')



	// add cube and animation to cubeWrapper
	cubeWrapper.appendChild(cube)
	cubeWrapper.appendChild(animation)

	// add cubeWrapper to scene
	document.querySelector('a-scene').appendChild(cubeWrapper)
}

// Create any number of cubes with any material
const makeCubes = (numCubes, images) => {
	while (numCubes >= 0) {
		createCube(images)
		numCubes--
	}
	console.log('making cubes')
}

// updated speed based on intensity or a personality trait
const updateSpeed = (n) => {
	tickSpeed = n
}

// update rotation direction based on sentiment
const updateDirection = (direction) => {
	// logic
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

// Artifact from bubbles
// const onWindowResize = () => {
// 	let camera = document.getElementById('cubeCamera')
// 	windowHalfX = window.innerWidth / 2;
// 	windowHalfY = window.innerHeight / 2;
// 	camera.setAttribute('aspect', window.innerWidth / window.innerHeight)
// }

module.exports = { setLight, makeCubes, animate, updateSpeed, updateDirection}

