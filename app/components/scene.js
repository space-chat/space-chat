import glMatrix, { vec3 } from 'gl-matrix'
import ParticleSystem from 'aframe-particle-system-component'
import Layout from 'aframe-layout-component'
import Animation from 'aframe-animation-component'

var windowHalfX = window.innerWidth / 2
var windowHalfY = window.innerHeight / 2
// var width = window.innerWidth || 2;
// var height = window.innerHeight || 2;
// var mouseX = 0
// var mouseY = 0
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


/* --------------------   SKY   ------------------- */

// add background image (starry sky)
export function initSky() {
    var sky = document.createElement('a-sky')
    sky.setAttribute('id', 'sky')
    sky.setAttribute('src', '#starrySky')
    sky.setAttribute('color', 'white')
    document.querySelector('a-scene').appendChild(sky)
}

export function updateSkyColor(color) {
    var sky = document.getElementById('sky')
    var animation = document.createElement('a-animation')
    animation.setAttribute('attribute', 'material.color')
    animation.setAttribute('to', color)
    animation.setAttribute('ease', 'ease-in-circ')
    sky.appendChild(animation)
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
    stars.setAttribute('particle-system',
        ['preset: dust',
            'texture: #star-particle',
            `color: ${colorA}, ${colorB}`,
            'particleCount: 5000',
            'size: 3',
            'maxAge: 4',
        ].join(';'))
    document.querySelector('a-scene').appendChild(stars)
}


/* -------------------- PLANETS ------------------- */

// returns semi-random xyz coordinates
function setPlanetPosition() {
    let x = Math.floor(Math.random() * 41) - 20;
    let y = Math.floor(Math.random() * 41) - 20;
    let z = Math.floor(Math.random() * 41) - 20;
    return { x: x, y: y, z: z }
}

// returns a semi-random texture
function setPlanetTexture() {
    var textures = ['#moon', '#planet1', '#planet2', '#planet3', '#planet4', '#planet5', '#planet6']
    return textures[Math.floor(Math.random() * textures.length)]
}

// returns a semi-random radius
function setPlanetSize() {
    return Math.random() * 3
}

// creates a planet of semi-random size, texture, and position
function createPlanet() {
    var planet = document.createElement('a-sphere')
    var size = setPlanetSize()
    var position = setPlanetPosition()
    var texture = setPlanetTexture()
    planet.setAttribute('position', position)
    planet.setAttribute('src', texture)
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

export function initLight(color) {
    var light = document.createElement('a-light')
    light.setAttribute('id', 'light1')
    light.setAttribute('color', `${color}`)
    light.setAttribute('angle', '45')
    light.setAttribute('position', '-16.717 11.189 17.925')
    light.setAttribute('type', 'spot')
    light.setAttribute('target', 'avatar')
    light.setAttribute('rotation', '0 -18.73571990077792 -6.245239966925973')
    light.setAttribute('intensity', '1.5')
    document.querySelector('a-scene').appendChild(light)
}

export function updateLightColor(color) {
    var light = document.getElementById('light1')
    light.setAttribute('color', `${color}`)
}



// update sky color if primary emotion has changed
// export function updateSkyColor(skyColor, prevSkyColor) {
//     if (skyColor !== prevSkyColor) {
//         let animation = document.createElement('a-animation')
//         animation.setAttribute('begin', 'sentiment-change')
//         animation.setAttribute('attribute', 'material.color')
//         animation.setAttribute('from', prevSkyColor)
//         animation.setAttribute('to', skyColor)
//         animation.setAttribute('ease', 'ease-in-circ')
//     }
// }


function onWindowResize() {
    var camera = document.getElementById('sceneCamera')
    camera.setAttribute('aspect', window.innerWidth / window.innerHeight)
}

// function onDocumentMouseMove(event) {
//     mouseX = (event.clientX - windowHalfX) / 100;
//     mouseY = (event.clientY - windowHalfY) / 100;
// }
