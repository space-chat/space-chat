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
            'particleCount: 8000',
            'size: 3',
            'maxAge: 4',
        ].join(';'))
    document.querySelector('a-scene').appendChild(stars)
}



/* -------------------- SCATTERED PLANETS ------------------- */

// returns semi-random xyz coordinates
function setPosition() {
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



/* -------------------- PLANET CIRCLE ------------------- */

// creates a planet with small orbiting spheres
function initPlanetOrbit(texture) {
    // create central planet
    var center = document.createElement('a-sphere')
    center.setAttribute('scale', '2 2 2')
    center.setAttribute('src', texture)
    document.getElementById('planet-circle').appendChild(center)

    // create circle layout for orbit objects
    var circle = document.createElement('a-entity')
    circle.setAttribute('layout', 'type: circle; radius: 1.75; plane: xz')

    // create orbit objects
    for (var i = 0; i < 50; i++) {
        var sphere = document.createElement('a-sphere')
        sphere.setAttribute('src', '#gold-sparkle')
        sphere.setAttribute('opacity', '0.7')
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

// creates a circle of planets around the camera, each with its own orbit
export function initPlanetCircle() {
    // create circle layout
    var circle = document.createElement('a-entity')
    circle.setAttribute('id', 'planet-circle')
    circle.setAttribute('layout', 'type: circle; radius: 15; plane: xz')
    document.querySelector('a-scene').appendChild(circle)

    // create planets
    for (var i = 0; i < 7; i++) {
        initPlanetOrbit(`#planet${i}`)
    }
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



/* -------------------- ETC ------------------- */

function onWindowResize() {
    var camera = document.getElementById('sceneCamera')
    camera.setAttribute('aspect', window.innerWidth / window.innerHeight)
}

