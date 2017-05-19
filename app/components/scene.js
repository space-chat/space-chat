import glMatrix, { vec3 } from 'gl-matrix'
import ParticleSystem from 'aframe-particle-system-component'

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var width = window.innerWidth || 2;
var height = window.innerHeight || 2;
var mouseX = 0;
var mouseY = 0;
// var currentScale = 0.2
// var tickSpeed = 0.00005
// var movementPath = "trig";
// var altitude = "normal"
// var animationId; 

// Set up camera, mouse listener, window resize listener
export function initScene() {
	var camera = document.getElementById('sceneCamera')
	camera.setAttribute('fov', 60) //field of view
	camera.setAttribute('aspect', window.innerWidth / window.innerHeight) //aspect
	camera.setAttribute('near', 0.01) //near
	camera.setAttribute('far', 1000) //far
	camera.setAttribute('position', { z: 3 })
	camera.setAttribute('focalLength', 3)

	window.addEventListener('resize', onWindowResize, false);
	// document.addEventListener('mousemove', onDocumentMouseMove, false)
}

export function initLights(avatarColor) {
    var light1 = document.createElement('a-light')
    light1.setAttribute('id', 'light1')
    light1.setAttribute('color', `${avatarColor}`)
    light1.setAttribute('angle', '45')
    light1.setAttribute('position', '-16.717 11.189 17.925')
    light1.setAttribute('type', 'spot')
    light1.setAttribute('target', 'avatar')
    light1.setAttribute('rotation', '0 -18.73571990077792 -6.245239966925973')
    light1.setAttribute('intensity', '3')
    document.querySelector('a-scene').appendChild(light1)
}

export function initParticles() {
    var particles = document.createElement('a-entity')
    particles.setAttribute('particle-system', [
        'preset: dust',
        'color: fuchsia, blue',
        'particleCount: 5000',
        'size: 2',
        'maxAge: 4',
        'opacity: 0.8'
    ].join(';'))

    document.querySelector('a-scene').appendChild(particles)
}

export function updateLightColor(avatarColor) {
    var light = document.getElementById('light1')
    light.setAttribute('color', `${avatarColor}`)
}






// Create single star
function createStar(position) {
    let star = document.createElement('a-sphere')
    star.setAttribute('position', position)
    star.setAttribute('color', 'fuchsia')
    star.setAttribute('scale', { x: 0.05, y: 0.05, z: 0.05 })
    // let star = document.createElement('a-entity')
    // star.setAttribute('position', position)
    // star.setAttribute('particle-system',
    //     ['preset: dust',
    //         'type: sphere',
    //         'color: yellow, white',
    //         'accelerationValue: 0 0 0',
    //         'positionSpread: 0.01 0.01 0.01',
    //         'maxAge: 1',
    //         'particleCount: 100',
    //         'size: 0.2',
    //         'direction: 1',
    //         'velocityValue: 0.1 0.1 0.1',
    //         'velocitySpread: 1 1 1'
    //     ].join(';')
    // )
    document.querySelector('a-scene').appendChild(star)
}

function getRandCoord() {
    var coord = Math.random() * 60;
    return Math.random() < .5 ? coord + 5 : coord * -1 - 5;
}

// Generate random coordinates for star position
function setPosition() {
    let xCoord = getRandCoord()
    let yCoord = getRandCoord()
    let zCoord = getRandCoord()
    return { x: xCoord, y: yCoord, z: zCoord }
}

// Create star field
export function createStarField() {
    console.log('You hit createStarField!')
    let count = 1000
    while (count >= 0) {
        createStar(setPosition())
        count--
    }
}

// Create star field - OPTION 2
// export function createStarField(position) {
//     console.log('You hit createStarField!')
//     let starField = document.createElement('a-entity')
//     starField.setAttribute('position', position)
//     starField.setAttribute('particle-system',
//         [ 'preset: dust',
//           'rotationAxis: null',
//           'rotationAngle: 0',
//           'size: 1',
//           'accelerationValue: 0 0 0',
//           'accelerationSpread: 0 0 0',
//           'velocityValue: 0 0 0',
//           'velocitySpread: 0 0 0',
//           'color: red',
//           'maxAge: 60',
//           'duration: 1',
//         ].join(';')
//     )
//     document.querySelector('a-scene').appendChild(starField)
// }

// Initialize 'stardust' around each avatar
// Needs to receive object of x,y,z coordinates of avatar
export function createStardust() {
    let avatars = document.querySelectorAll('.avatar')
    avatars.forEach(avatar => {
        avatar.setAttribute(
        'particle-system',
        [   'preset: dust',                       // default, dust, snow, rain
            'type: 2',                            // 1 (box), 2(sphere), 3(disc)
            'accelerationValue: 0 0 0',
            'accelerationSpread: 0 10 0',
            'positionSpread: 8 8 8',
            'color: white,black',
            'maxAge: 1',
            'size: 0.25',
            'blending: 2',
            'direction: 1',
            'velocityValue: 5 5 5',
            // 'velocitySpread: 8 8 8',
            'rotationAxis: y',
            // rotationAngle: 0; dust preset is 3.14
            'particleCount: 50000'
        ].join(';')
    )})
    // document.querySelector('.avatar').appendChild(stardust)
}

// update sky color if primary emotion has changed
export function updateSkyColor(skyColor, prevSkyColor) {
    if (skyColor !== prevSkyColor) {
        let animation = document.createElement('a-animation')
        animation.setAttribute('begin', 'sentiment-change')
        animation.setAttribute('attribute', 'material.color')
        animation.setAttribute('from', prevSkyColor)
        animation.setAttribute('to', skyColor)
        animation.setAttribute('ease', 'ease-in-circ')
    }
}

// Adjust color/speed of stardust
export function updateStardust() {
}

// Adjust brightness of star field
export function updateStarField() {
}

export function animate() {
}

export function render() {
}

function onWindowResize() {
    var camera = document.getElementById('spaceCamera')
    camera.setAttribute('aspect', window.innerWidth / window.innerHeight)
}

function onDocumentMouseMove(event) {
	mouseX = (event.clientX - windowHalfX) / 100;
	mouseY = (event.clientY - windowHalfY) / 100;
}