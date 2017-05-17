// initScene() -- initializes scene with camera and window resize listener
// initStarField() -- initializes starfield based on stemkowski particle system
// createStardust() -- creates stardust around each Avatar
// animate()
// render()

// updateSkyColor() -- sky color changes according to primary Emotion
// updateStardust() -- stardust intensity adjusts according to intensity of primary Emotion
// updateStarField() -- increase/decrease star brightness for stars in star field

import glMatrix, {vec3} from 'gl-matrix'
import ParticleSystem from 'aframe-particle-system-component'


// Set up camera, mouse listener, window resize listener
export function initScene() {
    var camera = document.getElementById('spaceCamera')
    camera.setAttribute('fov', 60) //field of view
    camera.setAttribute('aspect', window.innerWidth / window.innerHeight) //aspect
    camera.setAttribute('near', 0.01) //near
    camera.setAttribute('far', 1000) //far
    camera.setAttribute('position', { z: 3 })
    camera.setAttribute('focalLength', 3)
    window.addEventListener('resize', onWindowResize, false)
}

// Create single star
function createStar(position, color) {
    let star = document.createElement('a-entity')
    star.setAttribute('position', position)
    star.setAttribute('particle-system',
        ['preset: dust',
            'type: sphere',
            'color: yellow, white',
            'accelerationValue: 0 0 0',
            'positionSpread: 0.01 0.01 0.01',
            'maxAge: 1',
            'particleCount: 100',
            'size: 0.2',
            'direction: 1',
            'velocityValue: 0.1 0.1 0.1',
            'velocitySpread: 1 1 1'
        ].join(';')
    )
}

// Generate random coordinates for star position
function setPosition() {
    let x = (Math.random() * 501) - 250
    let y = (Math.random() * 501) - 200
    let z = (Math.random() * 501) - 200
    return { x: x, y: y, z: z }
}

// Create star field
export function createStarField() {
    let count = 100
    while (count >= 0) {
        createStar(setPosition())
        count--
    }
}


/* -------------------- AVATARS --------------------- */

const avatarRadius = 1.75
    , avatarCircleRadius = 8
    , cameraToCenter = vec3.fromValues(0, 0, -avatarCircleRadius)

// Direct camera from current user's POV
export function centerScene(cameraPosition, radius, out){
  return vec3.add(out, cameraPosition, cameraToCenter)
}

// Initialize a new avatar each time user enters the room
export function addAvatar(avatarPosition) {
    let avatar = document.createElement('a-sphere')
    avatar.setAttribute('position', avatarPosition)
    avatar.setAttribute('radius', '1.75')
    avatar.setAttribute('color', 'white')
    avatar.setAttribute('material', 'src: #blossoms')
}

// Create avatars depending on how many users are in the room
export function createAvatars(avatarPosition) {
    let avatar = document.createElement('a-sphere')
    avatar.setAttribute('position', avatarPosition)
    avatar.setAttribute('radius', '1.75')
    avatar.setAttribute('color', 'white')
    avatar.setAttribute('material', 'src: #blossoms')
}

// Initialize 'stardust' around each avatar
// Needs to receive object of x,y,z coordinates of avatar
export function createStardust(avatarPosition) {
    let stardust = document.createElement('a-entity')
    stardust.setAttribute('position', avatarPosition)
    stardust.setAttribute('particle-system',
        ['preset: dust',                    // default, dust, snow, rain
            'type: 2',                         // 1 (box), 2(sphere), 3(disc)
            'accelerationValue: 0 0 0',
            'accelerationSpread: 0 10 0',
            'positionSpread: 8 8 8',
            'color: white,black',
            'maxAge: 1',
            'size: 0.25',
            'blending: 2',
            'direction: 1',
            'velocityValue: 5 5 5',
            'velocitySpread: 8 8 8',
            'rotationAxis: y',
            // rotationAngle: 0; dust preset is 3.14
            'particleCount: 50000'
        ].join(';')
    )
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



