import React, {Component} from 'react'
import {connect} from 'react-redux'

// higher order component that allows Room to transcribe speech
import SpeechRecognition from 'react-speech-recognition'
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
  constructor() {
    super()
    this.state = {
      language: ''
    }
  }

  componentWillMount() {
    this.setState({ language: this.props.language })
  }

  componentDidMount() {
    // broadcast language to server
    joinRoom(this.state.language)
    // set listeners to receive sentiment analyses, translated messages
    receiveSentiment()
    receiveMessage(this.state.language)
  }

  // NB: web speech API waits to finalize text until after a short pause
  componentWillReceiveProps({transcript, finalTranscript, resetTranscript}) {
    // when transcript finalized/ regular transcript and final transcript are the same
    if (transcript === finalTranscript && finalTranscript) {
      // emit 'message' with finalTranscript as payload
      sendMessage(finalTranscript, this.state.language)
      resetTranscript()
    }
  }

  // when the scene renders, API will start recording 
  render() {
    const { transcript, 
      finalTranscript, 
      resetTranscript, 
      browserSupportsSpeechRecognition, 
      recognition } = this.props
    // check if browser supports the web speech API
    if (!browserSupportsSpeechRecognition) return null
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
