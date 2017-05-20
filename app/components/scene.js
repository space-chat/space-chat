import glMatrix, { vec3 } from 'gl-matrix'
import ParticleSystem from 'aframe-particle-system-component'
import Layout from 'aframe-layout-component'

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
// var width = window.innerWidth || 2;
// var height = window.innerHeight || 2;
// var mouseX = 0;
// var mouseY = 0;
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


/* -------------------- STARFIELD ------------------- */

// initializes or updates starfield with appropriate color
export function initStars(colorA, colorB) {
    if (document.getElementById('stars')) {
        var oldStars = document.getElementById('stars')
        oldStars.parentNode.removeChild(oldStars)
    }
    var stars = document.createElement('a-entity')
    stars.setAttribute('id', 'stars')
    stars.setAttribute('particle-system', [
        'preset: dust',
        `color: ${colorA}, ${colorB}`,
        'texture: https://raw.githubusercontent.com/stemkoski/stemkoski.github.com/master/Three.js/images/spikey.png',
        'particleCount: 100000',
        'size: 2',
        'maxAge: 5'
    ].join(';'))
    document.querySelector('a-scene').appendChild(stars)
}

export function moveStars() {
    var movingStars = document.createElement('a-entity')
    movingStars.setAttribute('id', 'particles')
    movingStars.setAttribute('particle-system',
        ['preset: dust',
            // 'color: fuchsia, blue',
            'particleCount: 5000',
            'size: 2',
            'rotationAngle: 90',
            'texture: https://raw.githubusercontent.com/stemkoski/stemkoski.github.com/master/Three.js/images/spikey.png',
            'maxAge: 4'
        ].join(';'))
}

/* -------------------- PLANETS ------------------- */

// returns a partially-random set of x,y,z coordinates to be used in createPlanet()
function setPlanetPosition() {
	let x = Math.floor(Math.random() * 41) - 20;
    let y = Math.floor(Math.random() * 41) - 20;
    let z = Math.floor(Math.random() * 41) - 20;
    return {x: x, y: y, z: z}
}

// returns a partially-random texture to be used in createPlanet()
function setPlanetTexture() {
    var options = {
        moon: '',
        venus: '',
        mars: '',
        neptune: ''
    }
}

// returns a partially-random radius to be used in createPlanet()
function setPlanetSize() {
    return Math.random() * 0.2
}

// creates a 'planet' of partially-random size and texture
function createPlanet() {
    var planet = document.createElement('a-sphere')

    var size = setPlanetSize()
    var position = setPlanetPosition()
    // var texture = setPlanetTexture()

    planet.setAttribute('position', position)
    planet.setAttribute('src','#moon')
    planet.setAttribute('color', 'pink')
    planet.setAttribute('size', size)

    document.querySelector('a-scene').appendChild(planet)
}

// puts random planets in the sky
export function initPlanets() {
    for (var i = 0; i < 50; i++) {
        createPlanet()
    }
}


/* -------------------- LIGHTS ------------------- */

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
            ['preset: dust',                       // default, dust, snow, rain
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
        )
    })
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




// export function initParticles() {
//     var particles1 = document.createElement('a-entity')
//     particles1.setAttribute('id', 'particles')
//     particles1.setAttribute('particle-system', [
//         'preset: dust',
//         'color: white, pink',
//         // 'color: fuchsia, blue',
//         'particleCount: 2000',
//         'rotationAngle: 0',
//         'rotationAxis: z',
//         // 'accelerationValue: 10 10 10',
//         'size: 2',
//         'texture: https://raw.githubusercontent.com/stemkoski/stemkoski.github.com/master/Three.js/images/spikey.png',
//         'maxAge: 5'
//     ].join(';'))
//     document.querySelector('a-scene').appendChild(particles1)

    // var particles2 = document.createElement('a-entity')
    // particles2.setAttribute('id', 'particles')
    // particles2.setAttribute('particle-system', [
    //     'preset: dust',
    //     'color: white, pink',
    //     // 'color: fuchsia, blue',
    //     'particleCount: 2000',
    //     'rotationAngle: 90',
    //     'rotationAxis: x',
    //     // 'accelerationValue: 10 10 10',
    //     'size: 2',
    //     'texture: https://raw.githubusercontent.com/stemkoski/stemkoski.github.com/master/Three.js/images/spikey.png',
    //     'maxAge: 5'
    // ].join(';'))
    // document.querySelector('a-scene').appendChild(particles2)

    // var particles3 = document.createElement('a-entity')
    // particles3.setAttribute('id', 'particles')
    // particles3.setAttribute('particle-system', [
    //     'preset: dust',
    //     'color: white, pink',
    //     // 'color: fuchsia, blue',
    //     'particleCount: 2000',
    //     'rotationAngle: 45',
    //     'rotationAxis: y',
    //     // 'accelerationValue: 10 10 10',
    //     'size: 2',
    //     'texture: https://raw.githubusercontent.com/stemkoski/stemkoski.github.com/master/Three.js/images/spikey.png',
    //     'maxAge: 5'
    // ].join(';'))
    // document.querySelector('a-scene').appendChild(particles3)
// }