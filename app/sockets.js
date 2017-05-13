import io from 'socket.io-client'
import store from './store.jsx'
import { updateEmotion, updateIntensity } from './reducers/sentimentReducer.jsx'

const socket = io()

// enable text-to-speech in browser
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
      // find correct voice, speak text from 'got message' payload
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

    // get emotions, intensity
    let emotions = emotion[0]
    let sortedEmotions = [['joy', 0.5], ['sadness', 0.5]] //default primary and secondary emotions

    // rank emotions in sorted array: least intense to most intense
    let keys = Object.keys(emotions)
    console.log('keys are', keys)
    sortedEmotions = keys.map(key => emotions[key])
      .sort().reverse().map(intensity => {
      for (let e in emotions) {
        if (emotions[e] === intensity) return [e, intensity]
      }
    })


    // identify strongest personality trait
    let primaryEmotion = 'joy' // default
    let intensity = 0.5
    for (var e in emotions) {
      if (emotions[e] > emotions[primaryEmotion]) {
        primaryEmotion = e
      }
    }

    console.log('sortedEmotions is', sortedEmotions.slice(0, 2))
    
    // update store with new emotion data
    store.dispatch(updateEmotion(sortedEmotions[0][0], sortedEmotions[1][0]))
    store.dispatch(updateIntensity(sortedEmotions[0][1], sortedEmotions[1][1]))
    //document.querySelector('#sky').emit('sentiment-change')
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
