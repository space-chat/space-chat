import React from 'react'
import { vecToStr } from '../utils'

const Avatar = props => {
  return (
    <a-entity
      position={vecToStr(props.position)}
      particle-system={
        ['preset: snow',                       // default, dust, snow, rain
          'type: 2',                            // 1 (box), 2(sphere), 3(disc)
          'accelerationValue: 0 0 0',
          'accelerationSpread: 0 10 0',
          'positionSpread: 8 8 8',
          'color: white',
          'maxAge: 1',
          'size: 0.09',
          'blending: 2',
          'direction: 1',
          'velocityValue: 5 5 5',
          'rotationAxis: y',
          'particleCount: 50000'
        ].join(';')} >
      <a-sphere radius="3" src="#moon" />
    </a-entity>
  )
}

export default Avatar
