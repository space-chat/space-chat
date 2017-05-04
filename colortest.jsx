import React, { Component } from 'react';
import ReactDOM from 'react-dom'

const score = require('./server.js').score
const mag = require('./server.js').magnitude

const colortest = () => {

    let color = score < 0 ? "blue" : "yellow";
    let opacity = mag < 100 ? 0.2 : 1;

    return (
        <div>
            <a-scene>
                <a-assets>
                    <img id="flowerSky" src="blossoms.jpg"/>
                </a-assets>
                    <a-sphere position="-1 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
                    <a-torus-knot position="3 0.6 -3" radius="0.5" height="1.5" color="#FFC65D"></a-torus-knot>
                    <a-sky src="#ffffff"></a-sky>
                </a-scene> 
        </div>
    )
}

ReactDOM.render(colortest, document.getElementById("app"))


