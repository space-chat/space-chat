import React, {Component} from 'react'
import Avatar from './Avatar' //avatar not rendering rn
import AssetsLoader from './AssetsLoader'

const Scene = () => {
  return (
    <div>
      <a-scene>
        <AssetsLoader />
        <Avatar position="-1.5 1 -4"/>
         <a-sphere id="avatar" position="-1 1.25 -5" radius="1.75" material="src: #blossoms" color="white"></a-sphere>
        <a-light color="red" angle="45" position="-1 1 0" type="spot" target="avatar" ></a-light>
        <a-sky src="#stars"></a-sky>
      </a-scene>
    </div>
  )
}

export default Scene
