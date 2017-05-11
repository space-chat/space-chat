import React from 'react'

// props passed from Room (or 'Scene') component

// I am thinking the avatars are orbs with dedicated lights, the light is what changes based on sentiment: glowing orbs. If time, with WebRTC of people on them :D

const Avatar = () => {
	return (
	<div>
		<a-sphere 
			radius="1.25" 
			color="yellow">
		</a-sphere>
	</div>
	)
}

export default Avatar

/* -----------------
	 Old Avatar Example
	----------------- */
	// Entity with id and compenents. I am assucming child entities inherit material components from parent (I know they inheret position compoonents for relative positioning)
	// <a-entity id="avatar" 
	// 	position={`${props.x} ${props.y} ${props.z}`} 
	// 	material={`color: ${props.avatarColor}`}>
	// 	<a-entity id="avatar-body" 
	// 		geometry={`primitive: cone; radiusBottom: ${props.bodyRadius}; radiusTop: ${props.bodyRadius}/10`} />
	// 	<a-entity id="avatar-head"
	// 		geometry={`primitive: dodecahedron; radius: ${props.bodyRadius}/4`}
	// 		position={0, 1, 0} />
	// </a-entity>
