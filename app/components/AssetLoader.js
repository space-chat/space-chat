// This component loads assets and mixins, so that they can be called by other components without needing to continually re-render and interrupting the scene.

import React from 'react'

export default function AssetLoader() {
	return (
		//Set timeout for scene to run even if all assets are not fully loaded. Default time is 3 seconds. 

		//Linter is showing error on timeout, but syntax is copied from Transcend
		<a-assets timeout="3000">

			{/* Sky assets */}
			<img id="blossoms" src="/images/blossoms.jpg" />
			<img id="stars" src="/images/sky-stars.png" />
			<img id="space" src="images/sky_stars.jpg" />
			<img id="fractal" src="/images/fractal.jpg" />
			<img id="deer" src="/images/deer.jpg" />
			<img id="cliff" src="/images/cliff.jpg" />
			<img id="gh" src="/images/gh.jpg" />
			<img id="roses" src="/images/roses.jpg" />
			<img id="rainbow" src="/images/rainbow.jpg" />
			<img id="sunset" src="/images/sunset.jpg" />
			<img id="tiedye" src="/images/tiedye.jpg" />
			<img id="colors" src="/images/colors.jpg" />
			<img id="krabi" src="/images/krabi.jpg" />
			<img id="moon" src="/images/moon.jpg" />


		{/* Mixin example from Transcend. Mixins are reusable assets. In this case the 'chair-part' was used to compose chairs in the Chair component. */}
			<a-mixin id="chair-part" geometry="primitive: box" material="color: #BFBFBF" />
		</a-assets>
	)
}

//credit for #colors: 
// photo credit: Rantz <a href="http://www.flickr.com/photos/99804259@N00/33003256230">Susan's World</a> via <a href="http://photopin.com">photopin</a> <a href="https://creativecommons.org/licenses/by-nc-sa/2.0/">(license)</a>

//credit for #krabi
//photo credit: Sitoo <a href="http://www.flickr.com/photos/7470842@N04/32252838043">A window to Krabi (made of limestone)</a> via <a href="http://photopin.com">photopin</a> <a href="https://creativecommons.org/licenses/by-nc-nd/2.0/">(license)</a>
