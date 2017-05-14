import React from 'react'
import AssetLoader from './AssetLoader'

const Blossoms = (props) => {
  console.log('props are', props)
  /* -----
    props {
      primaryEmotion
      secondaryEmotion
      primaryIntensity
      secondaryIntensity
    }
  ----- */
  return (
    <div>
      <a-scene>
        <AssetLoader />
        <a-sphere id="avatar" position="-1 1.25 -5" rotation="45 76 100" radius="0.15" material="src: #blossoms" normal-texture-repeat="50" color="white" />
        <a-sphere id="avatar" position="4 3.25 -10" rotation="45 76 100" radius="0.2" material="src: #blossoms" color="white" />
        <a-sky
          id="sky"
          src="#blossoms">
        {/*<a-animation
            begin="sentiment-change"
            attribute="material.color"
            from={prevSkyColor}
            to="#000000"
            ease="ease" />*/}
        </a-sky>
      </a-scene>
    </div>
  )
}

export default Blossoms
