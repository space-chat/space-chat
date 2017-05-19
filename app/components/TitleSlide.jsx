import React from 'react'
import AssetLoader from './AssetLoader'

const Title = (props) => {
    return (
        <a-scene>
            <AssetLoader />
            <a-sky src="#space"></a-sky>
            <a-entity id="spacechat" position="-10.718 3.136 -0.632" text-geometry="value:spacechat" mixin="bold" rotation="10 -20 0" scale="2 2 2 " material="color: white"></a-entity>

            <a-sphere scale="0.0001 0.0001 0.0001" id="sphere" position="-6.178 3.136 -0.632"></a-sphere>

            <a-entity position="-6.882 1.821 0.407" text="color:white;opacity:1;value:How likely are you to chat in space?;width:1.5" rotation="0 -20 0" scale="3 3 2"></a-entity>

                <a-entity position="-8.44 4.234 2.225" camera
                rotation="-26.909 -8.94 0" 
                look-controls
                 wasd-controls
                  mouse-cursor="" orbit-controls="target:#sphere;autoRotate: true; rotateSpeed:0.01;enableDamping:true;maxPolarAngle:3.142;minDistance:7;maxDistance:15;rotateTo:0 0 0"></a-entity>
        </a-scene>
    )
}

export default Title

{/*<a-entity position="" camera="0:t;1:r;2:u;3:e;active:false" rotation="" look-controls="0:t;1:r;2:u;3:e" wasd-controls="0:t;1:r;2:u;3:e" mouse-cursor="" orbit-controls="target:#spacechat;rotateSpeed:0.14;enableDamping:true;maxPolarAngle:3.142;minDistance:3;maxDistance:15;rotateTo:0 0 0"></a-entity>*/}