import React from 'react'

// props passed from Room (or 'Scene') component
// the Room is an A-frame smart component. Objects in the room are dumb components.
export default (props) => (
	/* -----------------
	 Define entity and components. 

	 - If we want the position or rotation to be responsive to sentiment, the x, y, z coordinates can be variables, as demonstrated here.

	 - 
	----------------- */
	// Entity with id and compenents. I am assucming child entities inherit material components from parent (I know they inheret position compoonents for relative positioning)
	<a-entity id="avatar" 
		position={`${props.x} ${props.y} ${props.z}`} 
		material={`color: ${props.avatarColor}`}>
		<a-entity id="avatar-body" 
			geometry={`primitive: cone; radiusBottom: ${props.bodyRadius}; radiusTop: ${props.bodyRadius}/10`} />
		<a-entity id="avatar-head"
			geometry={`primitive: dodecahedron; radius: ${prpos.bodyRadius}/4`}
			position={0, 1, 0} />
	</a-entity>
)
