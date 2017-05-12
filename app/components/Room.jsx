/* ------------------------------------------------
When Room loads, it:
(0) Renders dumb <Scene /> component
(1) Starts recording and transcribing audio input (thanks to SpeechRecognition API)
(2) Sets user's chosen language on state
(3) Emits a 'join' message to server through socket (via joinRoom())
(4) When speech transcription is finalized (happens when user pauses), emits 'message' msg to server through socket (via sendMesssage())
   - server then processes transcription:
      - analyzes sentiment, emits 'got sentiment' with sentiment data
      - translates into target language, emits 'got message' with translated text
(5) Receives sentiment data from server via receiveSentiment()
(6) Receives translated text from server via receiveMessage()
------------------------------------------------ */

import React, {Component} from 'react'
import {connect} from 'react-redux'

// higher order component that allows Room to transcribe speech
import SpeechRecognition from 'react-speech-recognition'
// react thing that the browser will yell at you for if it's not correct
import PropTypes from 'prop-types' 

import Scene from './Scene.jsx'
import { joinRoom, sendMessage, receiveMessage, receiveSentiment } from '../sockets.js'

const propTypes = {
  // props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
}

class Room extends Component {
  constructor(props) {
    super(props)
    // do we need text on state?
    this.state = {
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
    //We only want final transcripts to be sent when they are finished finalizing
    if (transcript === finalTranscript) {
      this.setState({text: finalTranscript})
      // emit 'message' with finalTranscript as payload
      sendMessage(finalTranscript, this.state.language)
    }
    receiveSentiment()
  }

  //When the scene renders, the API will start recording 
  render() {
    const { transcript, finalTranscript, resetTranscript, browserSupportsSpeechRecognition, recognition } = this.props
    // check if the user's browser supports the web speech api
    if (!browserSupportsSpeechRecognition) {
      return null
    }
    // // concat interim and final, to show the text editing itself
    // console.log("TRANSCRIPT", transcript)
    // // to log final here, pass it down as a prop from node package
    // console.log("FINAL", finalTranscript)
    // console.log("STATE", this.state)
    
    receiveMessage()

    let prevEmotion = this.props.sentiment.primaryEmotion[1] || 'joy'
    let currEmotion = this.props.sentiment.primaryEmotion[0] || 'joy'

    return (
      <Scene prevEmotion={prevEmotion} currEmotion={currEmotion} />
    )
  }
}

Room.propTypes = propTypes
const EnhancedRoom = SpeechRecognition(Room)

const mapState = ({language, sentiment}) => ({language, sentiment})

export default connect(mapState, null)(EnhancedRoom)


/*
1. I am importing react-speech-component which is a simple node package that is a higher order component that uses the web speech API. 
    This will capture our interim and final transcript speech. 
    We could just build this ourselves if we wanted. It's not extrememly complicated. 
    We might even want to rewrite it and adapt it to do text to speech, or anything else we want it to do. 
    The only thing I don't like about this component is that I don't know how to turn the speech to text off without exiting the page.  
2. I am putting the final transcript on the state. 
*/
