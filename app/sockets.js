import io from 'socket.io-client'
import store from './store.jsx'
import { updateEmotion } from './reducers/sentimentReducer.jsx'

const socket = io()

export function joinRoom(language) {
  socket.emit('join', language)
}

export function sendMessage(spokenText, lang) {
  // does google translate api need to know language of incoming text?
  socket.emit('message', { spokenText, lang })
}

export function receiveMessage() {
  socket.on('got message', ({ translatedBool, spokenText, lang }) =>
    // if lang in 'got message' payload matches socket user's language
    // speak text from 'got message' payload
    console.log(`translated? ${translatedBool}`, `text: ${spokenText}`, `language: ${lang}`)
  )
}

export var skyColor = ''

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
    // then emit 'sentiment-change' event to <a-sky>
    store.dispatch(updateEmotion(primaryEmotion))
      .then(document.querySelector('#sky').emit('sentiment-change'))
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
