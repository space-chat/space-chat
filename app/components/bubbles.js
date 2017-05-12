//This code is based on Three.js' example here: https://github.com/mrdoob/three.js/blob/master/examples/webgl_effects_anaglyph.html
var spheres = [];
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var directionalLight, pointLight;
var mouseX = 0;
var mouseY = 0;



export const initScene = () => {
	var camera = document.getElementById('bubbleCamera')
	camera.setAttribute('fov', 60) //field of view
	camera.setAttribute('aspect', window.innerWidth/window.innerHeight) //aspect
	camera.setAttribute('near', 0.01) //near
	camera.setAttribute('far', 100) //far
	camera.setAttribute('position', {z: 5})
	camera.setAttribute('focalLength', 3)
}

export const makeBubbles = () => {
for (var i = 0; i < 40; i++) {
	var sphere = document.createElement('a-sphere')
	let x = Math.random() * 10 - 5;
	let y = Math.random() * 10 - 5;
	let z = Math.random() * 10 - 5;
	sphere.setAttribute('position', {x: x, y: y, z: z})
	let scale = Math.random() * 1 + 0.3
	sphere.setAttribute('scale', {x: scale, y: scale, z: scale})
	document.querySelector('a-scene').appendChild(sphere);
	spheres.push(sphere);

	window.addEventListener( 'resize', onWindowResize, false );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false )
}
}

	function onWindowResize() {
		var camera = document.getElementById('bubbleCamera')
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;
		camera.setAttribute('aspect', window.innerWidth / window.innerHeight)
		//effect.setSize( window.innerWidth, window.innerHeight );
	}

	function onDocumentMouseMove(event) {
				mouseX = ( event.clientX - windowHalfX ) / 100;
				mouseY = ( event.clientY - windowHalfY ) / 100;
	}

				var path = "textures/cube/pisa/";
				var format = '.png';
				var urls = [
					path + 'px' + format, path + 'nx' + format,
					path + 'py' + format, path + 'ny' + format,
					path + 'pz' + format, path + 'nz' + format
				];
				var textureCube = new THREE.CubeTextureLoader().load( urls );
				// scene = new THREE.Scene();
			// 	scene.background = textureCube;
			// 	var geometry = new THREE.SphereBufferGeometry( 0.1, 32, 16 );
			// 	var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );
		
			// 	//
			// 	renderer = new THREE.WebGLRenderer( { antialias: false } );
			// 	renderer.setPixelRatio( window.devicePixelRatio );
			// 	// document.body.appendChild( renderer.domElement );
			// 	// this.refs.threejs.appendChild( renderer.domElement );
			// 	var width = window.innerWidth || 2;
			// 	var height = window.innerHeight || 2;
			// 	// effect = new THREE.AnaglyphEffect( renderer );
			// 	// effect.setSize( width, height );
			// 	//
			// }
			
			export const animate = () => {
				requestAnimationFrame( animate );
				 render();
			}

			function render() {
				var camera = document.getElementById('bubbleCamera')
				var timer = 0.0001 * Date.now();
				let curr = camera.getAttribute("position")
				let addx = curr.x + (( mouseX - curr.x ) * .05)
				let addy = curr.y + (( - mouseY - curr.y ) * .05)
				camera.setAttribute('position', {x: addx, y: addy, z: 5})
			
				// camera.lookAt( scene.position );
				let position = document.querySelector('a-scene').getAttribute('position')
				camera.setAttribute('look-at', position)
				for ( var i = 0, il = spheres.length; i < il; i ++ ) {
					var sphere = spheres[ i ];
					sphere.setAttribute('position', {x: 5 * Math.cos( timer + i )})
					sphere.setAttribute('position', {y: 5 * Math.sin( timer + i * 1.1)})

					// sphere.position.x = 5 * Math.cos( timer + i );
					// sphere.position.y = 5 * Math.sin( timer + i * 1.1 );
				}
				//effect.render( scene, camera );
			}
