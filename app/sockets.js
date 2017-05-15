import io from 'socket.io-client'
import store from './store.jsx'
import { primaryEmotion, secondaryEmotion, primaryIntensity, secondaryIntensity, updateExtraversion, updateOpenness, updateConscientiousness, updateAgreeableness, updateSentiment } from './reducers/sentimentReducer.jsx'

// enable text-to-speech in browser
const synth = window.speechSynthesis
let voices

let socket

export function openSocket() {
  socket = io()
}

export function closeSocket() {
  const closed = socket.close()
}

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

    // get primary and secondary emotions, and their intensities
    let emotions = emotion[0]
    let sortedEmotions = [['joy', 0.5], ['surprise', 0.5]] // default 

    // rank emotions in sorted array: most intense to least intense
    let keys = Object.keys(emotions)
    sortedEmotions = keys.map(key => emotions[key])
      .sort().reverse().map(intensity => {
      for (let e in emotions) {
        if (emotions[e] === intensity) return [e, intensity]
      }
    })
    console.log('top two emotions are', sortedEmotions.slice(0, 2))

    // get personality trait ratings
    let primEmo = sortedEmotions[0][0]  //primary emotion
    let secEmo = sortedEmotions[1][0]   //secondary emotion
    let primInt = sortedEmotions[0][1]  //primary emotion's intensity
    let secInt = sortedEmotions[1][1]   //secondary emotion's intensity
    let extraversion = personality[0].extraversion || 0.001
    let openness = personality[0].agreeableness || 0.001
    let conscientiousness = personality[0].agreeableness || 0.001
    let agreeableness = personality[0].agreeableness || 0.001
    let sentScore = sentiment[0]        //sentiment score

    console.log('extraversion is ', extraversion, 'agreeableness is ', agreeableness, 'openness is ', openness, 'conscientiousness is ', conscientiousness)
    
    // update store with new emotion data

    store.dispatch(primaryEmotion(primEmo))
    store.dispatch(secondaryEmotion(secEmo))
    store.dispatch(primaryIntensity(primInt))
    store.dispatch(secondaryIntensity(secInt))
    store.dispatch(updateExtraversion(extraversion))
    store.dispatch(updateOpenness(openness))
    store.dispatch(updateConscientiousness(conscientiousness))
    store.dispatch(updateAgreeableness(agreeableness))
    store.dispatch(updateSentiment(sentScore))

    // document.querySelector('#sky').emit('sentiment-change')
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
