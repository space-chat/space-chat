import React, {Component} from 'react'  //dis be react
import io from '../sockets' //dis be socket.io's client side plugin. 
import SpeechRecognition from 'react-speech-recognition'  //A higher order component that allows our component to transcribe speech
import PropTypes from 'prop-types' //install prop-types, which is a react thing that the browser will yell at you for if it's not correct
import {connect} from 'react-redux'
import sendForAnalysis from '../reducers/sentimentReducer.jsx'


const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
}

class Scene extends Component {
  constructor() {
    super()
    this.state = {
      text: ''
    }
  }

//When the regular transcript and final transcript are the same, so when the final transcript has finalized, the put it on the state. 
//We probably don't want to translate and analyze text word by word. Only when the user is finished talking/has made a short pause. 
//The web speech API waits to finalize text until after a short pause. Pretty sure we can change how long this pause is. 
componentWillReceiveProps() {
  if (this.props.transcript === this.props.finalTranscript) {
    this.setState({text: this.props.finalTranscript})
  }
    if(this.state.text) {
       this.props.sendForAnalysis(this.state.text)
       console.log("yassssss")
    }  
}

//When the scene renders, the API will start recording them 
  render() {
    // let socket = io()
    const { transcript, finalTranscript, resetTranscript, browserSupportsSpeechRecognition, recognition } = this.props
    if (!browserSupportsSpeechRecognition) {   //This checks if the user's browswer supports the web speech api
      return null
    }
    console.log("TRANSCRIPT", transcript) //this concats the interim and final together. so you can see the text editing itself. 
    console.log("FINAL", finalTranscript) //this is just the final. you have to wait a few seconds before it prints. this might be better for sentiment analysis
    //To log the final transcript here, first go into the node package and pass it down as as a prop. 

    //When the regular transcript and final transcript are the same, so when the final transcript has finalized, the put it on the state. 
    console.log(transcript === finalTranscript)
    console.log("STATE", this.state)
    return (
      <div>
        <a-scene>
          <a-assets>
            <img id="flowerSky" src="blossoms.jpg" />
          </a-assets>
          <a-sphere position="-1 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
          <a-torus-knot position="3 0.6 -3" radius="0.5" height="1.5" color="#FFC65D"></a-torus-knot>
          <a-sky src="#flowerSky"></a-sky>
        </a-scene>
      </div>
    )
  }
}

Scene.propTypes = propTypes
const EnhancedScene = SpeechRecognition(Scene)

const mapState = ({sentiment}) => ({sentiment})

export default connect(mapState, {sendForAnalysis})(EnhancedScene)

/*
1. I am importing react-speech-component which is a simple node package that is a higher order component that uses the web speech API. 
    This will capture our interim and final transcript speech. 
    We could just build this ourselves if we wanted. It's not extrememly complicated. 
    We might even want to rewrite it and adapt it to do text to speech, or anything else we want it to do. 
    The only thing I don't like about this component is that I don't know how to turn the speech to text off without exiting the page.  

2. I am putting the final transcript on the state. 
*/

//Get some text and put it in the state. 
//Dispatch a reducer with the text that will hit an api route
//This api route will send back some stuff from indico. 
//Bing bam boom. Capstone KOd. 