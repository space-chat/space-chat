import React from 'react'

// props passed from Room (or 'Scene') component
// the Room is an A-frame smart component. Objects in the room are dumb components.
export default (props) => (
	// define entity. If we want the position to be responsive to sentiment, the x, y, z coordinates can be variables, as demonstrated here.
	<a entity id="avatar" position={`${props.x} ${props.y} ${props.z}`}
	)