import React, {Component} from 'react'
import Avatar from '../../components-aframe/Avatar'
import AssetLoader from '../../components-aframe/AssetLoader'

const Scene = () => {
  return (
    <div>
      <a-scene>
        <AssetLoader />
        <Avatar />
        <a-light color="white" position="-1 1 0"></a-light>
        <a-sky src="#stars2"
          material="shader: flat; color: #ff0000">
        </a-sky>
      </a-scene>
    </div>
  )
}

export default Scene
