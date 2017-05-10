import React from 'react'

// props passed from Room (or 'Scene') component
// the Room is an A-frame smart component. Objects in the room are dumb components.
export default () => (
	// define entity. If we want the position to be responsive to sentiment, the x, y, z coordinates can be variables, as demonstrated here.
	// <a entity id="avatar" position={`${props.x} ${props.y} ${props.z}`}></a>
	<a-entity>
		<a-sphere position="-1 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
		<a-torus-knot position="3 0.6 -3" radius="0.5" height="1.5" color="#FFC65D"></a-torus-knot>
	</a-entity>
)



/*

Old avatars:

<a-sphere position="-1 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
<a-torus-knot position="3 0.6 -3" radius="0.5" height="1.5" color="#FFC65D"></a-torus-knot>


Avatar in progress:
  <a-entity 
    id="avatar" 
    position={`${props.x} ${props.y} ${props.z}`} 
    material={`color: ${props.avatarColor}`}>

    <a-entity 
	  id="avatar-body" 
      geometry={`primitive: cone; radiusBottom: ${props.bodyRadius}; radiusTop: ${props.bodyRadius}/10`} />

    <a-entity 
	  id="avatar-head"
      geometry={`primitive: dodecahedron; radius: ${props.bodyRadius}/4`}
      position={0, 1, 0} />

  </a-entity>
*/
