import React, {Component} from 'react'
import {connect} from 'react-redux'

// higher order component that allows Room to transcribe speech
import SpeechRecognition from 'react-speech-recognition'
// react thing that the browser will yell at you for if it's not correct
import PropTypes from 'prop-types' 

import Scene from './Scene.jsx'
import { joinRoom } from '../sockets.js'

const propTypes = {
  // props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
}

class Room extends Component {
  constructor() {
    super()
    // do we need text on state?
    this.state = {
      text: '',
      language: ''
    }
  }

  componentWillMount() {
    this.setState({ language: this.props.language })
  }

  componentDidMount() {
    joinRoom(this.state.language)
  }

  // When the regular transcript and final transcript are the same, 
  // the final transcript has finalized, so it goes on state
  // The web speech API waits to finalize text until after a short pause.
  componentWillReceiveProps({transcript, finalTranscript}) {
    if (transcript === finalTranscript) {
      this.setState({text: finalTranscript})
    }
    if (finalTranscript) {
      // emit 'message' with finalTranscript as payload
      console.log("received final transcript:", finalTranscript)
    }  
  }

  //When the scene renders, the API will start recording 
  render() {
    const { transcript, finalTranscript, resetTranscript, browserSupportsSpeechRecognition, recognition } = this.props
    // check if the user's browser supports the web speech api
    if (!browserSupportsSpeechRecognition) {
      return null
    }
    // concat interim and final, to show the text editing itself
    console.log("TRANSCRIPT", transcript)
    // to log final here, pass it down as a prop from node package
    console.log("FINAL", finalTranscript)

    console.log(transcript === finalTranscript)
    console.log("STATE", this.state)

    return (
      <Scene />
    )
  }
}

Room.propTypes = propTypes
const EnhancedRoom = SpeechRecognition(Room)

const mapState = ({language}) => ({language})

export default connect(mapState, null)(EnhancedRoom)


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
