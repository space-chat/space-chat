import React, { Component } from 'react';
// import * as THREE from 'three';

import { initScene, makeBubbles, animate } from './bubbles.js'

export default class Bubbles extends Component {

    componentDidMount() {
        initScene()
        makeBubbles()
        animate()
    }

    render() { 
        return (
            <div>
                <a-scene vr-mode-ui="enabled: true">
                    <a-entity id="bubbleCamera" camera="userHeight: 1.6" look-controls></a-entity>
                    <a-assets>
                        <img id="flowerSky" src="blossoms.jpg" />
                    </a-assets>
                    <a-sphere position="-1 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
                    <a-sky src="#flowerSky"></a-sky>
                </a-scene>
            </div>
        )
    }
}