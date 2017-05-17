import React, { Component } from 'react';

import { initScene, makeBubbles, animate, sizeOrColor, updateSpeed, updatePath } from './bubbles.js'

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

    //Handles changing for all emotions except surprise
    handleSizeOrColor() {
        sizeOrColor(this.state.scale, this.state.sky, this.state.color, 3)
    }

    render() {
        return (
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
        )
    }
}

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
