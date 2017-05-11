import React, {Component} from 'react'
import Avatar from './Avatar'
import AssetLoader from './AssetLoader'

const Scene = () => {
  return (
    <div>
      <a-scene>
        <AssetLoader />
        <Avatar />
        <a-light color="white" position="-1 1 0"></a-light>
        <a-sky id="sky" src="#stars">
          { /* need to use functionality in a-frame/set-sky-color.js here */ }
        </a-sky>
      </a-scene>
    </div>
  )
}

export default Scene
