// This component loads assets and mixins, so that they can be called by other components without needing to continually re-render and interrupting the scene.

import React from 'react'

export default function AssetLoader(props) {
	return (
		{/* Set timeout for scene to run even if all assets are not fully loaded. Default time is 3 seconds. 
		Linter is showing error on timeout, but syntax is copied from Transcend. */}
		<a-assets timeout="3000" >

			{/* Sky assets */}
			<img id="blossoms" src="/blossoms.jpg" />


		{/* Mixin example from Transcend. Mixins are reusable assets. In this case the 'chair-part' was used to compose chairs in the Chair component. */}
			<a-mixin id="chair-part" geometry="primitive: box" material="color: #BFBFBF" />
		</a-assets>
	)
}