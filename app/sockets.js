import io from 'socket.io-client'
import store from './store.jsx'
import { updateEmotion } from './reducers/sentimentReducer.jsx'

const socket = io()

const synth = window.speechSynthesis
let voices

export function joinRoom(language) {
  socket.emit('join', language)
  voices = synth.getVoices()
}

export function sendMessage(messageText, lang) {
  console.log('sending message ', messageText, ' in language ', lang)
  socket.emit('message', { messageText, lang })
}

export function receiveMessage(clientLang) {
  socket.on('got message', ({ translatedBool, messageText, lang }) => {
    console.log('incoming message ', messageText, ' in language ', lang)
    // if lang in 'got message' payload matches socket user's language
    if (clientLang === lang && translatedBool) {
      // speak text from 'got message' payload
      var utterance = new SpeechSynthesisUtterance(messageText)
      utterance.voice = voices.filter(voice => 
        voice.lang.substr(0,2) === clientLang
      )[0]
      synth.speak(utterance)
    }
  })
}

export function receiveSentiment() {
  socket.on('got sentiment', ({ emotion, sentiment, personality }) => {
    console.log(`emotion: ${emotion}`, `sentiment: ${sentiment}`, `personality: ${personality}`)

    // update view with sentiment data
    let emotions = emotion[0]

    // identify strongest emotion
    let primaryEmotion = 'joy' // default
    for (var e in emotions) {
      if (emotions[e] > emotions[primaryEmotion]) {
        primaryEmotion = e
      }
    }

    // update store with new emotion data
    store.dispatch(updateEmotion(primaryEmotion))
    document.querySelector('#sky').emit('sentiment-change')
  }

    /* ----- Example of output: ------
  
     emotion:
     [ { anger: 0.11315701900000001,
         surprise: 0.085946694,
         sadness: 0.5705037713000001,
         fear: 0.15985926990000002,
         joy: 0.0705333054 } ],
  
    sentiment: [ 0.0125864741 ],
  
    personality:
     [ { openness: 0.3719486252,
         extraversion: 0.6793065118,
         agreeableness: 0.7661266693000001,
         conscientiousness: 0.47509849260000003 } ] 
  
    -------------------------------- */

  )
}
