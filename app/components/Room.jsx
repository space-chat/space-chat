/* ------------------------------------------------
When Room loads, it:
(0) Renders dumb <Scene /> component
(1) Starts recording and transcribing audio input (thanks to SpeechRecognition API)
(2) Sets user's chosen language on state
(3) Emits a 'join' message to server through socket (via joinChannel())
(4) Sets listeners for 'got sentiment' and 'got message' from server via receiveSentiment() and receiveMessage()
(4) When speech transcription is finalized (/when user pauses), emits 'message' msg to server through socket via sendMesssage()
   - server then processes transcription:
      -- analyzes sentiment, emits 'got sentiment' with sentiment data
      -- translates into target language, emits 'got message' with translated text
(5) Receives sentiment data from server via receiveSentiment()
(6) Receives translated text from server via receiveMessage()
------------------------------------------------ */

import React, { Component } from 'react'
import { connect } from 'react-redux'

// higher order component that allows Room to transcribe speech
import SpeechRecognition from 'react-speech-recognition'
import PropTypes from 'prop-types'

import Space from './Space.jsx'
import Bubbles from './Bubbles.jsx'
import Knots from './Knots.jsx'
import Cubes from './Cubes.jsx'
import { openSocket, closeSocket, updateRoster
       , joinChannel, sendMessage
       , receiveMessage, receiveSentiment } from '../sockets.js'


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
      langDict: {},
      bubbleSky: '#blossoms'
    }
  }

  componentWillMount() {
    //choose a random sky for Bubbles
    const skies = ["#blossoms", "#colors", "#krabi"]
    //establish new socket connection to 'namespace' associated with scene
    openSocket(this.props.scene)
    
    this.setState({ 
      bubbleSky: skies[Math.floor(Math.random() * 3)],
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
      }
    })

    if (!this.props.browserSupportsSpeechRecognition) return null
  }

  componentWillUnmount() {
    console.log('warning: component will unmount!')
    // disconnect socket, also leaves channels, unsets listeners
    closeSocket(this.state.language)
  }

  componentDidMount() {
    // broadcast language to server
    joinChannel(this.state.language)
    // set listener to update roster
    updateRoster()
    // set listeners to receive sentiment analyses, translated messages
    receiveSentiment()
    receiveMessage(this.state.language)
  }

  // NB: web speech API waits to finalize text until after a short pause
  componentWillReceiveProps({ transcript, finalTranscript, resetTranscript, recognition }) {
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
    let primaryPersonality = this.props.sentiment.primaryPersonality[0] || 'default'
    let extraversion = this.props.sentiment.extraversion[0] || 0.5
    let openness = this.props.sentiment.openness[0] || 0.5
    let conscientiousness = this.props.sentiment.conscientiousness || 0.5
    let agreeableness = this.props.sentiment.agreeableness || 0.5

    // sentiment score
    let sentimentScore = this.props.sentiment.sentimentScore[0] || 0.5

    // speaker for above data
    let speaker = this.props.sentiment.speaker

    // scene
    let scene = this.props.scene
    let sceneComponent

    switch (scene) {
      case 'bubbles':
        sceneComponent = <Bubbles roster={this.props.roster} sky={this.state.bubbleSky} 
          currEmotion={currEmotion} prevEmotion={prevEmotion} 
          sentimentScore={sentimentScore} primaryPersonality={primaryPersonality} />
        break
      case 'knots':
        sceneComponent = <Knots roster={this.props.roster} 
          currEmotion={currEmotion} prevEmotion={prevEmotion} 
          sentimentScore={sentimentScore} primaryPersonality={primaryPersonality} />
        break
      case 'space':
        sceneComponent = <Space roster={this.props.roster} 
          currEmotion={currEmotion} prevEmotion={prevEmotion} 
          sentimentScore={sentimentScore} primaryPersonality={primaryPersonality} />
        break
      case 'cubes':
        sceneComponent = <Cubes roster={this.props.roster} 
          currEmotion={currEmotion} prevEmotion={prevEmotion} 
          sentimentScore={sentimentScore} primaryPersonality={primaryPersonality} />
        break
    }

    console.log('emotions in Room are', prevEmotion, currEmotion)

    return (
      <div id="sceneComponent" >
        {sceneComponent}
      </div>
    )
  }
}

Room.propTypes = propTypes
const EnhancedRoom = SpeechRecognition(Room)

const mapState = ({language, sentiment, scene, roster}) => ({language, sentiment, scene, roster})

export default connect(mapState, null)(EnhancedRoom)

