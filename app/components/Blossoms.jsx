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
  if (props.currEmotion === 'fear') {
    return (
      <div>
        <a-scene fog="type: exponential; color: gray">
          <AssetLoader />
          <a-sphere id="avatar" position="-1 1.25 -5" radius="1.75" material="src: #blossoms" color="white" />
          <a-sphere id="avatar" position="4 3.25 -10" radius="1.75" material="src: #blossoms" color="white" />
         <a-entity light="type: hemisphere; color: #33C; groundColor: #3C3; intensity: 2"></a-entity>

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
  } else {
    return (
        <div>
        <a-scene>
          <AssetLoader />
          <a-sphere id="avatar" position="-1 1.25 -5" radius="1.75" material="src: #blossoms" color="white" />
          <a-sphere id="avatar" position="4 3.25 -10" radius="1.75" material="src: #blossoms" color="white" />
         <a-entity light="type: hemisphere; color: #33C; groundColor: #3C3; intensity: 2"></a-entity>

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

}

export default Blossoms
