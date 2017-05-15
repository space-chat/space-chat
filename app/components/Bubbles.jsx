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

        //Movement depends on the dominant personality
        let movement = {
            extraversion: "trig",
            conscientiousness: "coolness",
            openness: "circleZ",
            agreeableness: "pendulum"
        }

        //Compare current colors/personality with previous ones
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
        //Bubbles are bigger if the dominant personality is extraversion
        scale = domPersonality === "extraversion" ? 0.7 : 0.4

        //Set color (emotion), and scale (personality), and speed (emotion)
        this.setState({ color: color, scale: scale, pattern: pattern }, () => {
            if (this.state.color !== '#FF8300') {
                this.handleSizeOrColor()
            } else {
                sizeOrColor(0.4, this.state.sky, "#FF8300", 3) //orange
                sizeOrColor(0.4, this.state.sky, "#0FB235", 4) //green
                sizeOrColor(0.4, this.state.sky, "#5227B2", 5) //purple
                sizeOrColor(0.4, this.state.sky, "#FFD437", 7) //yellow
            }

            updatePath(this.state.pattern)
        })
    }

    //Update speed depending on the emotion
    componentWillUpdate() {
        if (this.state.color === "#FF0000") updateSpeed(0.0015)
        else if (this.state.color === "#494850") updateSpeed(0.00001)
        else updateSpeed(0.0007)
    }

    // handleAdd() {
    //     addBubbles(50, this.state.sky, this.state.color)
    // }

    //Handles changing for all emotions except surprise
    handleSizeOrColor() {
        sizeOrColor(this.state.scale, this.state.sky, this.state.color, 3)
    }

    render() {
        return (
            <div>
                {/*  uncomment to test... <div>
                    <button onClick={this.handleAdd}>Add bubbles</button>
                    <button onClick={this.handleSubtract}>Remove bubbles</button>
                    <button onClick={() => this.handleSizeOrColor()}>Size bubbles</button>
                    <button onClick={() => this.handleSpeed(0.001)}>Change bubble speed</button>
                    <button onClick={() => this.handlePath("circleY")}>Change to circleZ</button>
                    <button onClick={() => this.handleAltitude("high")}>Make bubbles higher</button>
                </div>*/}
                {
                    /*<div>
                <button onClick={() => this.handlePath("circleY")}>Change to circleY</button>
                <button onClick={() => this.handlePath("circleZ")}>Change to circleZ</button>
                <button onClick={() => this.handlePath("coolness")}>Change to coolness</button>
                 <button onClick={() => this.handlePath("trig")}>Change to trig</button>
                 <button onClick={() => this.handlePath("pendulum")}>Change to pendulum</button>
                </div>*/}
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

//Sentiment: Increases or decreases metalness (the inverse of the score)
//Emotions: Change bubble color
        //Anger: Bubbles turn red + increase speed
        //Joy:   Bubbles turn yellow  
        //Sadness: Bubbles turn blue + decrease in #
        //Fear:    Bubbles turn gray + stand still
        //Surprise: Bubbles turn orange and increase in #
//Personality: 
        //Extraversion: Bubbles increase in size and do a "trig"
        //Conscientiousness: Bubbles do a "coolness" pattern
        //Openness: Bubbles do a circleZ pattern
        //Agreeableness: Bubbles do a "pendulum" pattern 
