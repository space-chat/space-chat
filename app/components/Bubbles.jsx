import React, { Component } from 'react';

import { initScene, makeBubbles, animate } from './bubbles.js'

export default class Bubbles extends Component {

    componentDidMount() {
        initScene()
        makeBubbles()
        animate()
    }

    //to do later:
    //Make this component customizable so that it could take in
    //different skies and bubble faces
    //Make bubbles.js easier to read/look at
    //Hook up sentiment analysis
    //Over the weekend, work on a solar system component

    //For sentiment analysis:


//bubbles move in circle, revolving around something

    //Sentiment: sphere color or metalness
    //Personality: 
        //extraversion: bubbles increase in size
        //conscientiousness
        //openness
        //agreeableness
    //Emotion
        //joy: bubbles swirl around above in a pattern. 
        //anger: bubbles move very fast
        //fear: bubbles stand still
        //sadness: bubbles drop to a low altitude, and they start to disappear
        //surprise: bubbles light up in all kinds of cool colors. 

    render() {
        return (
            <div>
                <a-scene vr-mode-ui="enabled: true">
                    <a-entity id="bubbleCamera" camera="userHeight: 1.6" look-controls
                        orbit-controls="autoRotate: false; target: #pink; enableDamping: true; dampingFactor: 0.25; rotateSpeed:0.14; minDistance:3; maxDistance:15;" mouse-cursor="">
                    </a-entity>
                    <a-assets>
                        <img id="flowerSky" src="blossoms.jpg" />
                    </a-assets>
                    <a-sphere position="-1 1.25 -5" radius="0.01" color="#EF2D5E" id="pink"></a-sphere>
                    <a-sky src="#flowerSky"></a-sky>
                </a-scene>
            </div>
        )
    }
}

//Though we can't see the pink sphere, I'm still using it for the
//orbit controls. 