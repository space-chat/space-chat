import React, { Component } from 'react';

import { initScene, makeBubbles, animate, addBubbles, sizeOrColor, updateSpeed, updatePath } from './bubbles.js'

export default class Bubbles extends Component {

    constructor() {
        super()

        this.state = {
            sky: '#flowerSky',
            color: 'white',
            scale: 0.7,
            personality: 'default',
            pattern: 'trig'
        }

        this.handleAdd = this.handleAdd.bind(this)
        this.handleSizeOrColor = this.handleSizeOrColor.bind(this)
        // this.handleSpeed = this.handleSpeed.bind(this)
        // this.handlePath = this.handlePath.bind(this)
    }

    componentDidMount() {
        initScene()
        makeBubbles(200, this.state.sky, this.state.color)
        animate()
    }

    componentWillReceiveProps() {
        let emotionColors = {
            anger: '#FF0000',     // red
            surprise: '#FF8300',  // orange
            sadness: '#20A7D2',   // blue
            fear: '#494850',      // dark grey
            joy: '#FBFF00'        // yellow
        }

        let movement = {
            extraversion: "circleY",
            conscientiousness: "coolness",
            openness: "circleZ",
            agreeableness: "pendulum"
        }

        let currentColor = this.state.color
        let currentPers = this.state.personality
        let emotion = this.props.currEmotion
        // let metalness = 1 - this.props.sentimentScore
        let personality = this.props.primaryPersonality
        let color;
        let domPersonality;
        let scale;

        color = currentColor !== emotionColors[emotion] ? emotionColors[emotion] : this.state.color

        domPersonality = currentPers !== personality ? personality : this.state.personality

        let pattern = movement[domPersonality] || "trig"
        console.log("PATTER", pattern)
        scale = domPersonality === "extraversion" ? 0.7 : 0.4

        //Set metalness ( sentiment ), color (emotion), and scale (personality)
        this.setState({ color: color, scale: scale, pattern: pattern }, () => {
            // this.handleSizeOrColor()
            updatePath(this.state.pattern)
            console.log("STATE", this.state)
        })

        
        // updatePath(this.state.pattern)

        //     switch (this.state.color) {
        //         case "red":
        //             updateSpeed(0.001)
        //             break;
        //         case "gray":
        //             updateSpeed(0)
        //             break;
        //         default:
        //             updateSpeed(0.0003)
        //     }
    }

    handleAdd() {
        addBubbles(100, this.state.sky, this.state.color)
    }

    handleSizeOrColor() {
        sizeOrColor(this.state.scale, this.state.sky, this.state.color)
    }

    //Default speed is 0.0005
    // handleSpeed(n) {
    //     updateSpeed(n)
    // }

    //Default path (bubble pattern) is "trig"
    // handlePath(name) {
    //     updatePath(name)
    // }

    // this.handleSizeOrColor()
    //         this.handlePath(this.state.pattern)

    //         switch (this.state.color) {
    //             case "red": 
    //                 this.handleSpeed(0.015)
    //                 break; 
    //             case "gray": 
    //                 this.handleSpeed(0)
    //                 break; 
    //             default: 
    //                 this.handleSpeed(0.0005)
    //         }

    render() {
        // updatePath(this.state.pattern)
        return (
            <div>
                {/*<div>
                    <button onClick={this.handleAdd}>Add bubbles</button>
                    <button onClick={this.handleSubtract}>Remove bubbles</button>
                    <button onClick={() => this.handleSizeOrColor()}>Size bubbles</button>
                    <button onClick={() => this.handleSpeed(0.001)}>Change bubble speed</button>
                    <button onClick={() => this.handlePath("circleY")}>Change to circleZ</button>
                    <button onClick={() => this.handleAltitude("high")}>Make bubbles higher</button>
                </div>*/}
                <div>
                    <a-scene vr-mode-ui="enabled: true">
                        <a-entity id="bubbleCamera" camera="userHeight: 1.6" look-controls
                            mouse-cursor="">
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

//Sentiment: Increases or decreases metalness (the inverse of the score)
//Emotions: Change bubble color
        //Anger: Bubbles turn red + increase speed
        //Joy:   Bubbles turn yellow  
        //Sadness: Bubbles turn blue
        //Fear:    Bubbles turn gray + stand still
        //Surprise: Bubbles turn orange and increase in #
//Personality: 
        //Extraversion: Bubbles increase in size and do a circlY
        //Conscientiousness: Bubbles do a "coolness" pattern
        //Openness: Bubbles do a circleZ pattern
        //Agreeableness: Bubbles do a "pendulum" pattern 


//For orbit controls: 
// orbit-controls="autoRotate: false; target: #pink; enableDamping: true; dampingFactor: 0.25; rotateSpeed:0.14; minDistance:3; maxDistance:15;"
