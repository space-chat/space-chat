// This component controls sphere rendering and animations of Knots.jsx. 
// Adapted from: (1) https://github.com/mrdoob/three.js/blob/master/examples/webgl_effects_anaglyph.html (2) https://github.com/aframevr/aframe/blob/master/examples/showcase/dynamic-lights/index.html 

let knots = []
let lightX
let lightY 
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let width = window.innerWidth || 2;
let height = window.innerHeight || 2;
let mouseX = 0;
let mouseY = 0;
let movementPath = 'trig' 
let tickSpeed = 0.0002
let animationId 

const initScene = () => {
  let camera = document.getElementById('camera')
  camera.setAttribute('fov', 60) 
  camera.setAttribute('aspect', window.innerWidth / window.innerHeight) //aspect
  camera.setAttribute('near', 0.01)
  camera.setAttribute('far', 1000) 
  camera.setAttribute('position', { z: 3 })
  camera.setAttribute('focalLength', 3)

  window.addEventListener('resize', onWindowResize, false);
  document.addEventListener('mousemove', onDocumentMouseMove, false)
}

// create one random knot
const createKnot = () => {

  let knot = document.createElement('a-torus-knot')

  // set knot position - break into helper func
  let x = (Math.random() * 501) - 350
  let y = (Math.random() * 501) - 200
  let z = (Math.random() * 201) - 200
  knot.setAttribute('position', { x: x, y: y, z: z})
  console.log('position is', x, y, z)

  knot.setAttribute('radius', `${Math.random() * (8-3) + 3}`)
  knot.setAttribute('radiusTubular', `${Math.random() * 9}`)
  knot.setAttribute('p', `${Math.round(Math.random() * 6)}`)
  knot.setAttribute('q', `${Math.round(Math.random() * 7)}`)

  knot.setAttribute('metalness', `${(Math.random() * 0.7) + 0.6}`)
  knot.setAttribute('roughness', `${Math.random()}`)
  knot.setAttribute('segments-radial', '10')
  knot.setAttribute('spherical-env-map', '#tiedye')

  // give each knot a unique id
  knots.push(knot)
  knot.setAttribute('id', `knot-${knots.length}`)
  console.log('knot id is', knot, '-', knots.length)

  // set random knot into scene
  document.querySelector('a-scene').appendChild(knot)

}

// create multiple random knots
const makeKnots = (numKnots) => {
  while (numKnots >= 0) {
    createKnot()
    numKnots--
  }
  console.log('knots is', knots)
}

const updateKnotColor = (colorA, colorB) => {
  knots.forEach(knot => knot.setAttribute('color', `${colorA}`))

  for (let i = 0; i < knots.length; i += 2) {
    let knot = knots[i];
    knot.setAttribute('color', `${colorB}`)
  }
}

const setAmbientLightA = (colorA) => {
  console.log('light A being created')

    let lightA = document.createElement('a-light')

    lightA.setAttribute('position', '0 0 0')
    lightA.setAttribute('angle', '90')
    lightA.setAttribute('radius', '60')
    lightA.setAttribute('position', '-3 -4 1')
    lightA.setAttribute('type', 'ambient')
    lightA.setAttribute('intensity', '2')
    lightA.setAttribute('distance', '200')
    lightA.setAttribute('opacity', '0.5')
    lightA.setAttribute('color', `${colorA}`)
    lightA.setAttribute('id', 'lightA')

    document.querySelector('a-scene').appendChild(lightA)
}

const setAmbientLightB = (colorB) => {
  console.log('light B being created')

    let lightB = document.createElement('a-light')

    lightB.setAttribute('position', '0 0 0')
    lightB.setAttribute('angle', '90')
    lightB.setAttribute('radius', '60')
    lightB.setAttribute('position', '-3 -4 1')
    lightB.setAttribute('type', 'ambient')
    lightB.setAttribute('intensity', '2')
    lightB.setAttribute('distance', '200')
    lightB.setAttribute('opacity', '0.5')
    lightB.setAttribute('color', `${colorB}`)
    lightB.setAttribute('id', 'lightB')

    document.querySelector('a-scene').appendChild(lightB)
}

const updateLightColor = (colorC, colorD) => {
  document.getElementById('lightA').setAttribute('color', `${colorC}`)
  document.getElementById('lightB').setAttribute('color', `${colorD}`)
}

const makeRotatingLightX = () => {
  console.log('lightX is being created')
  lightX = document.createElement('a-light')
  lightX.setAttribute('geometry', 'primitive: sphere; radius: 1.5')
  lightX.setAttribute('material', 'shader: flat; opacity: 0')
  lightX.setAttribute('light', 'color: #0033cc; distance: 120; intensity: 3; type: point')
  document.querySelector('a-scene').appendChild(lightX)
}

const makeRotatingLightY = () => {
  console.log('lightY is being created')
  lightY = document.createElement('a-light')
  lightY.setAttribute('geometry', 'primitive: sphere; radius: 2')
  lightY.setAttribute('material', 'shader: flat; opacity: 0')
  lightY.setAttribute('light', `color: #ff6600; distance: 120; intensity: 2; type: point`)
  document.querySelector('a-scene').appendChild(lightY)
}

const updateSpeed = (rate) => {
  tickSpeed = rate
}

const updatePath = (pathName) => {
  movementPath = pathName
}

const render = (timeStamp) => {
  let camera = document.getElementById('camera')
  let timer = tickSpeed * timeStamp 
  let curr = camera.getAttribute('position') || { x: 1, y: 1 }
  let addx = curr.x + ((mouseX - curr.x) * .05)
  let addy = curr.y + ((- mouseY - curr.y) * .05)
  camera.setAttribute('position', { x: addx, y: addy, z: 5 })

  // circleZ animation path for lightX
  //  let light = document.getElementById('lightX')
  lightX.setAttribute('position', { x: 100 * Math.sin(20 * (timer + (2 * Math.PI))) })
  lightX.setAttribute('position', { z: 100 * Math.cos(20 * (timer + 3 + (2 * Math.PI)))  })


  // circleY animation path for lightY
  lightY.setAttribute('position', { x: 100 * Math.sin(20 * timer + (2 * Math.PI)) })
  lightY.setAttribute('position', { y: 100 * Math.cos(20 * timer + 2 * (2 * Math.PI)) })

  if (movementPath === "trig") {
    for (var i = 0, il = knots.length; i < il; i++) {
      var knot = knots[i];
      knot.setAttribute('position', { x: 50 * Math.cos(timer + i) })
      knot.setAttribute('position', { y: 50 * Math.sin(timer + i * 1.1) })
    }
  }
  else if (movementPath === "circleZ") {
    for (var i = 0, il = knots.length; i < il; i++) {
      var knot = knots[i];
      knot.setAttribute('position', { x: 80 * Math.sin(timer + i + (2)) })
      knot.setAttribute('position', { z: 100 * Math.cos(timer + i + 3) })
    }
  }
  else if (movementPath === "coolness") {
    for (var i = 0, il = knots.length; i < il; i++) {
      var knot = knots[i];
      knot.setAttribute('position', { x: 100 * Math.sin(timer + i * 0.5) })
      knot.setAttribute('position', { y: 100 * Math.sin(timer + i * 3) })
    }
  } else if (movementPath === "pendulum") {
    for (var i = 0, il = knots.length; i < il; i++) {
      var knot = knots[i];
      knot.setAttribute('position', { x: 100 * Math.sin(timer + i * -3 + 10) })
      knot.setAttribute('position', { z: 60 * Math.cos(timer + i * 0.5) })
    }
  }
}

const animate = (timeStamp) => {
  animationId = requestAnimationFrame(animate)
  render(timeStamp)
}

function stopAnimating() {
  cancelAnimationFrame(animationId)
}

const onWindowResize = () => {
  var camera = document.getElementById('camera')
  windowHalfX = window.innerWidth / 2
  windowHalfY = window.innerHeight / 2
  camera.setAttribute('aspect', window.innerWidth / window.innerHeight)
}

const onDocumentMouseMove = (event) => {
  mouseX = (event.clientX - windowHalfX) / 100
  mouseY = (event.clientY - windowHalfY) / 100
}

module.exports = { initScene, animate, makeKnots, setAmbientLightA, setAmbientLightB, makeRotatingLightX, makeRotatingLightY, updateKnotColor, updateLightColor, updateSpeed, updatePath, stopAnimating }
