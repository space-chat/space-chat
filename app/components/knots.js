// adapted from: https://github.com/aframevr/aframe/blob/master/examples/showcase/dynamic-lights/index.html 

let knots = []


































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