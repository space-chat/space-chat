import React, { Component } from 'react';

import { initScene, makeBubbles, animate, addBubbles, destroyBubbles, sizeBubbles, updateSpeed, updatePath } from './bubbles.js'

export default class Bubbles extends Component {

    constructor() {
        super()

        this.handleAdd = this.handleAdd.bind(this)
        this.handleSubtract = this.handleSubtract.bind(this)
        this.handleSize = this.handleSize.bind(this)
        this.handleSpeed = this.handleSpeed.bind(this)
        this.handlePath = this.handlePath.bind(this)
    }

    componentDidMount() {
        initScene()
        makeBubbles(200)
        animate()
    }

    handleAdd() {
        addBubbles(200)
    }

    handleSubtract() {
        destroyBubbles(100)
    }

    handleSize() {
        sizeBubbles(1)
    }

    //Default speed is 0.0005
    handleSpeed(n) {
        updateSpeed(n)
    }

    //Default path is "trig"
    handlePath(name) {
        updatePath(name)
    }

    //to do later:
    //Make this component customizable so that it could take in
    //different skies and bubble faces
    //AKA make it a higher order component

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
                <div>
                    <button onClick={this.handleAdd}>Add bubbles</button>
                    <button onClick={this.handleSubtract}>Remove bubbles</button>
                    <button onClick={this.handleSize}>Size bubbles</button>
                    <button onClick={() => this.handleSpeed(0.001)}>Change bubble speed</button>
                    <button onClick={() => this.handlePath("pendulum")}>Change to circleZ</button>
                </div>
                <div>
                    <a-scene vr-mode-ui="enabled: true">
                        <a-entity id="bubbleCamera" camera="userHeight: 1.6" look-controls
                            orbit-controls="autoRotate: false; target: #pink; enableDamping: true; dampingFactor: 0.25; rotateSpeed:0.14; minDistance:3; maxDistance:15;" mouse-cursor="">
                        </a-entity>
                        <a-assets>
                            <img id="flowerSky" src="images/blossoms.jpg" />
                        </a-assets>
                        <a-sphere position="-1 1.25 -5" radius="0.001" color="#EF2D5E" id="pink"></a-sphere>
                        <a-sky src="#flowerSky"></a-sky>
                    </a-scene>
                </div>
            </div>
        )
    }
}

//Though we can't see the pink sphere, I'm still using it for the
//orbit controls. 