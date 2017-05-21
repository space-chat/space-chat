import glMatrix, { vec3 } from 'gl-matrix'
import ParticleSystem from 'aframe-particle-system-component'
import Layout from 'aframe-layout-component'
import Animation from 'aframe-animation-component'


// Set up camera, window resize listener
export function initScene() {
    var camera = document.getElementById('sceneCamera')
    camera.setAttribute('fov', 60) //field of view
    camera.setAttribute('aspect', window.innerWidth / window.innerHeight) //aspect
    camera.setAttribute('near', 0.01) //near
    camera.setAttribute('far', 1000) //far
    camera.setAttribute('position', { z: 3 })
    camera.setAttribute('focalLength', 3)

    window.addEventListener('resize', onWindowResize, false);
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
export function initStarField(colorA, colorB) {
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
            'particleCount: 2000',
            'size: 3',
            'maxAge: 4',
        ].join(';'))
    document.querySelector('a-scene').appendChild(stars)
}

// returns semi-random xyz coordinates --- use for both stars and planets
function setPosition() {
    let x = Math.floor(Math.random() * 41) - 20;
    let y = Math.floor(Math.random() * 41) - 20;
    let z = Math.floor(Math.random() * 41) - 20;
    return { x: x, y: y, z: z }
}

function createStar() {
    var star = document.createElement('a-image')
    var position = setPosition()
    star.setAttribute('class', 'star')
    star.setAttribute('src', '#star-particle')
    star.setAttribute('transparent', 'true')
    star.setAttribute('position', position)
    star.setAttribute('height', '0.5')
    star.setAttribute('width', '0.5')
    document.getElementById('starField').appendChild(star)
}

export function initStarField2(num) {
    var starField = document.createElement('a-entity')
    starField.setAttribute('id', 'starField')
    starField.setAttribute('color', 'white')
    document.querySelector('a-scene').appendChild(starField)

    for (var i = 0; i < num; i++) {
        createStar()
    }
}

export function changeStarColor(color) {
    var starField = document.getElementById('starField')
    var changeColor = document.createElement('a-animation')
    changeColor.setAttribute('attribute', 'color')
    changeColor.setAttribute('to', color)
    changeColor.setAttribute('delay', 0)
    starField.appendChild(changeColor)

    // var stars = document.querySelectorAll('.star')
    // var starsArray = Array.prototype.slice.call(stars)

    // starsArray.forEach(star => {
    //     var changeColor = document.createElement('a-animation')
    //     changeColor.setAttribute('attribute', 'material.color')
    //     changeColor.setAttribute('to', color)
    //     changeColor.setAttribute('easing', 'ease-in-circ')
    //     star.appendChild(changeColor)
    // })
}


/* -------------------- PLANETS ------------------- */


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
    var position = setPosition()
    var texture = setPlanetTexture()
    planet.setAttribute('class', 'planet')
    planet.setAttribute('position', position)
    planet.setAttribute('src', texture)
    planet.setAttribute('scale', size)
    planet.setAttribute('rotation', "0 0 0")
    document.querySelector('a-scene').appendChild(planet)
}

// puts specified number of planets in the sky
export function initPlanets(num) {
    for (var i = 0; i < num; i++) {
        createPlanet()
    }
}

// makes all planets in the sky spin slowly along y-axis
export function rotatePlanets() {
    var planets = document.querySelectorAll('.planet')
    var planetsArray = Array.prototype.slice.call(planets)
    // console.log('PLANETSSSSS', planetsArray)
    planetsArray.forEach(planet => {
        var rotate = document.createElement('a-animation')
        rotate.setAttribute('attribute', 'rotation')
        rotate.setAttribute('to', '0 360 0')
        rotate.setAttribute('dur', '10000')
        rotate.setAttribute('easing', 'linear')
        rotate.setAttribute('fill', 'forwards')
        rotate.setAttribute('repeat', 'indefinite')
        planet.appendChild(rotate)
    })
}

// creates stardust that moves in a circular orbit around a larger planet
export function initPlanetOrbit(num) {
    // create central planet
    var center = document.createElement('a-sphere')
    center.setAttribute('position', '0 0 -10')
    center.setAttribute('scale', '2 2 2')
    center.setAttribute('src', '#planet1')
    document.querySelector('a-scene').appendChild(center)

    // create circle layout for orbit objects
    var circle = document.createElement('a-entity')
    circle.setAttribute('layout', 'type: circle; radius: 3; plane: xz')

    // create orbit objects
    for (var i = 0; i < num; i++) {
        var sphere = document.createElement('a-sphere')
        sphere.setAttribute('color', 'fuchsia')
        sphere.setAttribute('opacity', '0.8')
        sphere.setAttribute('scale', '0.05 0.05 0.05')
        circle.appendChild(sphere)
    }

    // creates animation for orbit
    var orbit = document.createElement('a-animation')
    orbit.setAttribute('target', '')
    orbit.setAttribute('attribute', 'rotation')
    orbit.setAttribute('to', '0 360 0')
    orbit.setAttribute('dur', '8000')
    orbit.setAttribute('easing', 'linear')
    orbit.setAttribute('repeat', 'indefinite')

    circle.appendChild(orbit)
    center.appendChild(circle)
}


/* -------------------- LIGHTING ------------------- */

export function initLight(color) {
    var light = document.createElement('a-light')
    light.setAttribute('id', 'light1')
    light.setAttribute('color', `${color}`)
    light.setAttribute('angle', '45')
    light.setAttribute('position', '-16.717 11.189 17.925')
    light.setAttribute('type', 'spot')
    light.setAttribute('target', 'avatar')
    light.setAttribute('rotation', '0 -18.73571990077792 -6.245239966925973')
    light.setAttribute('intensity', '1')
    document.querySelector('a-scene').appendChild(light)
}

export function updateLightColor(color) {
    var light = document.getElementById('light1')
    light.setAttribute('color', `${color}`)
}

function onWindowResize() {
    var camera = document.getElementById('sceneCamera')
    camera.setAttribute('aspect', window.innerWidth / window.innerHeight)
}
