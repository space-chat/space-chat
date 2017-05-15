/* ------------------------------------------------
When Room loads, it:
(0) Renders dumb <Scene /> component
(1) Starts recording and transcribing audio input (thanks to SpeechRecognition API)
(2) Sets user's chosen language on state
(3) Emits a 'join' message to server through socket (via joinRoom())
(4) Sets listeners for 'got sentiment' and 'got message' from server via receiveSentiment() and receiveMessage()
(4) When speech transcription is finalized (/when user pauses), emits 'message' msg to server through socket via sendMesssage()
   - server then processes transcription:
      -- analyzes sentiment, emits 'got sentiment' with sentiment data
      -- translates into target language, emits 'got message' with translated text
(5) Receives sentiment data from server via receiveSentiment()
(6) Receives translated text from server via receiveMessage()
------------------------------------------------ */

import React, {Component} from 'react'
import {connect} from 'react-redux'

// higher order component that allows Room to transcribe speech
import SpeechRecognition from 'react-speech-recognition'
import PropTypes from 'prop-types' 

import Scene from './Scene.jsx'

import { joinRoom, sendMessage, receiveMessage, receiveSentiment, closeSocket } from '../sockets.js'

const propTypes = {
  // props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
}

class Room extends Component {
  constructor(props) {
    super(props)
    this.state = {
      language: '',
      langDict: {}
    }
  }

  componentWillMount() {
    this.setState({ 
      language: this.props.language,
      langDict: {
        en: 'en-US',
        es: 'es-ES',
        zh: 'zh-CN',
        ar: 'ar-SA',
        de: 'de-DE',
        fr: 'fr-FR',
        it: 'it-IT',
        pt: 'pt-PT',
        nl: 'nl-NL',
        ja: 'ja-JP',
        ko: 'ko-KR',
        ru: 'ru-RU'
      }})
    if (!this.props.browserSupportsSpeechRecognition) return null
  }

  componentWillUnmount() {
    // disconnect socket, also leaves channels, unsets listeners
    closeSocket()
  }

  componentDidMount() {
    // broadcast language to server
    joinRoom(this.state.language)
    // set listeners to receive sentiment analyses, translated messages
    receiveSentiment()
    receiveMessage(this.state.language)
  }

  // NB: web speech API waits to finalize text until after a short pause
  componentWillReceiveProps({transcript, finalTranscript, resetTranscript, recognition}) {
    // set language for speech recognition input
    recognition.lang = this.state.langDict[this.state.language]
    // when transcript finalized/ regular transcript and final transcript are the same
    if (transcript === finalTranscript && finalTranscript) {
      // emit 'message' with finalTranscript as payload
      sendMessage(finalTranscript, this.state.language)
      resetTranscript()
    }
  }

  // when the scene renders, API will start recording 
  render() {
    // emotion data
    let prevEmotion = this.props.sentiment.primaryEmotion[1] || 'joy'
    let currEmotion = this.props.sentiment.primaryEmotion[0] || 'joy'
    let primaryIntensity = this.props.sentiment.primaryIntensity[0] || 0.5
    let secondaryIntensity = this.props.sentiment.secondaryIntensity[0] || 0.5

    // personality data
    // let primaryPersonality = this.props.sentiment.primaryPersonality[0] || 'default'
    let extraversion = this.props.sentiment.extraversion[0] || 0.5
    let openness = this.props.sentiment.openness[0] || 0.5
    let conscientiousness = this.props.sentiment.conscientiousness || 0.5
    let agreeableness = this.props.sentiment.agreeableness || 0.5

    // sentiment score
    let sentimentScore = this.props.sentiment.sentimentScore[0] || 0.5
    

    console.log('emotions in Room are', prevEmotion, currEmotion)
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
