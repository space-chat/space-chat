// This component controls sphere rendering and animations of Knots.jsx. 
// Adapted from: (1) https://github.com/mrdoob/three.js/blob/master/examples/webgl_effects_anaglyph.html (2) https://github.com/aframevr/aframe/blob/master/examples/showcase/dynamic-lights/index.html 

let knots = []
let tickSpeed = 0.00005

const setLights = () => {

  // light A
  let lightA = document.createElement('a-light')
  lightA.setAttribute('geometry', 'primitive: sphere; radius: 1.5')
  lightA.setAttribute('material', 'color: white; shader: flat')
  lightA.setAttribute('light', 'color: blue; distance: 120; intensity: 3; type: point')

  // light B
  let lightB = document.createElement('a-light')
  lightB.setAttribute('geometry', 'primitive: sphere; radius: 2')
  lightB.setAttribute('material', 'color: white; shader: flat')
  lightB.setAttribute('light', 'color: orange; distance: 120; intensity: 2; type: point')

  // set lights in scene
  document.querySelector('a-scene').appendChild(lightA)
  document.querySelector('a-scene').appendChild(lightB)

}



























module.exports = { setLights }


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