import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const Colortest = ({score, magnitude}) => {

  console.log('score is', score, 'mag is', magnitude)

  const red = Math.floor(255 * score).toString(16)
  const green = Math.floor(255 * magnitude).toString(16)
  const color = `#${red}${green}00`

  return (
    <div>
      <a-scene>
        <a-assets>
          <img id="flowerSky" src="blossoms.jpg"/>
        </a-assets>
        <a-sphere position="-1 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
        <a-torus-knot position="3 0.6 -3" radius="0.5" height="1.5" color="#FFC65D"></a-torus-knot>
        <a-sky color={color}> </a-sky>
      </a-scene> 
    </div>
  )
}


export default Colortest
