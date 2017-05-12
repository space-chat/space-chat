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


