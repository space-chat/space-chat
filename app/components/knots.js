// This component controls sphere rendering and animations of Knots.jsx. 
// Adapted from: (1) https://github.com/mrdoob/three.js/blob/master/examples/webgl_effects_anaglyph.html (2) https://github.com/aframevr/aframe/blob/master/examples/showcase/dynamic-lights/index.html 

let knots = []
let tickSpeed = 0.00005

/* -------------

const setLights = (rate) => {
  let wrapperX = document.createElement('a-entity')
  wrapperX.setAttribute('position', '0 0 0')
  wrapperX.setAttribute('id', 'wrapperX')

  let wrapperY = document.createElement('a-entity')
  wrapperY.setAttribute('position', '0 0 0')
  wrapperY.setAttribute('id', 'wrapperY')

  // light X: x-axis rotating
  let lightX = document.createElement('a-light')
  lightX.setAttribute('geometry', 'primitive: sphere; radius: 1.5')
  lightX.setAttribute('material', 'color: white; shader: flat')
  lightX.setAttribute('light', 'color: blue; distance: 120; intensity: 3; type: point')

  // light Y: y-axis rotating
  let lightY = document.createElement('a-light')
  lightY.setAttribute('geometry', 'primitive: sphere; radius: 2')
  lightY.setAttribute('material', 'color: white; shader: flat')
  lightY.setAttribute('light', 'color: orange; distance: 120; intensity: 2; type: point')

  // create animations
  let animationX = document.createElement('a-animation')
  animationX.setAttribute('attribute', 'rotation')
  animationX.setAttribute('to', '0 360 0')
  animationX.setAttribute('repeat', 'indefinite')
  animationX.setAttribute('easing', 'linear')
  animationX.setAttribute('dur', `${rate}`)

  let animationY = document.createElement('a-animation')
  animationX.setAttribute('attribute', 'rotation')
  animationX.setAttribute('to', '360 0 0')
  animationX.setAttribute('repeat', 'indefinite')
  animationX.setAttribute('easing', 'linear')
  animationX.setAttribute('dur', `${rate}`)

  // set lights and animations to wrappers -- needs to be fixed
  // break animation out into second function
  // document.getElementById('wrapperX').appendChild('lightX').appendChild('animationX')

  // document.getElementById('wrapperX').appendChild('lightY').appendChild('animationY')

  // set wrappers to scene
  document.querySelector('a-scene').appendChild(lightX)
  document.querySelector('a-scene').appendChild(lightY)

}

------------ */


const createKnot = () => {

  // helper funcs to generate random color and coords
  const getRandColor = () => {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
  }

  const getRandCoord = () => {
  var coord = Math.random() * 60;
  return Math.random() < 0.5 ? coord + 5 : coord * -1 - 5;
  }

  // create random knot
  let knot = document.createElement('a-torus-knot')

  knot.setAttribute('radius', `${Math.random() * 10}`)
  knot.setAttribute('radiusTubular', `${Math.random() * 0.85}`)
  knot.setAttribute('p', `${Math.round(Math.random() * 10)}`)
  knot.setAttribute('q', `${Math.round(Math.random() * 10)}`)

  knot.setAttribute('material', `${getRandColor()}`)
  knot.setAttribute('metalness', `${Math.random()}`)
  knot.setAttribute('roughness', `${Math.random()}`)

  knot.setAttribute('position', {
    x: `${getRandCoord()}`,
    y: `${getRandCoord()}`,
    z: `${getRandCoord()}`,
  })

  // set random knot into scene
  document.querySelector('a-scene').appendChild(knot)

}

const makeKnots = (numKnots) => {
  while (numKnots >= 0) {
    createKnot()
    numKnots--
  }
}

module.exports = { createKnot, makeKnots }


// functions for producing knot shapes in scene. not working.
/*const createShapes = () => {
	console.log('inside createShapes')
	// Helper functions
	const getRandColor = () => {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
	}

	const getRandCoord = () => {
	  var coord = Math.random() * 60;
	  return Math.random() < 0.5 ? coord + 5 : coord * -1 - 5;
	}

	// Generate random knots
	for (var i=0; i<120; i++) {
	console.log('inside createShapes 2')
	  return (
			<a-entity
				geometry={`
	  			primitive: torusKnot;
	    		radius: ${Math.random() * 10};
	    		radiusTubular: ${ Math.random() * 0.75 };
	    		p: ${ Math.round(Math.random() * 10)};
	    		q: ${ Math.round(Math.random() * 10) }
	    	`}
				material={`
	    		color: ${getRandColor()};
	    		metalness: ${Math.random()};
	    		roughness: ${Math.random()}
				`}
				position={`
	    		x: ${getRandCoord()};
	    		y: ${getRandCoord()};
	    		z: ${getRandCoord()}
				`}
			/>
		)
	}
}*/