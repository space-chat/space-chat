import io from 'socket.io-client'
import store from './store.jsx'
import { primaryEmotion, primaryIntensity, primaryPersonality, updateSentiment, updateSpeaker } from './reducers/sentimentReducer.jsx'

// enable text-to-speech in browser
const synth = window.speechSynthesis
let voices

let socket

export function openSocket(scene) {
  // open socket, connect to 'namespace' associated with scene
  console.log('connecting to namespace ', scene)
  socket = io(`/${scene}`)
}

export function closeSocket(language) {
  // disconnecting socket handled server-side
  socket.emit('close me', language)
}

export function joinRoom(language) {
  // subscribing to language channel handled server-side
  socket.emit('join request', language)
  voices = synth.getVoices()
}

export function updateRoster() {
  // when client receives roster, print array of socket id's to console
  socket.on('roster', roster => console.log('roster is', roster))
}

export function sendMessage(messageText, lang) {
  console.log('sending message ', messageText, ' in language ', lang)
  socket.emit('message', { messageText, lang })
}

export function receiveMessage(clientLang) {
  // when client receives message from language channel
  socket.on('got message', ({ translatedBool, messageText, lang }) => {
    console.log('incoming message ', messageText, ' in language ', lang)
    // find correct voice, speak text from 'got message' payload
    var utterance = new SpeechSynthesisUtterance(messageText)
    utterance.voice = voices.filter(voice => 
      voice.lang.substr(0,2) === clientLang
    )[0]
    synth.speak(utterance)
  })
}

export function receiveSentiment() {
  socket.on('got sentiment', ({ emotion, sentiment, personality, speaker }) => {
    console.log(`emotion: ${emotion}`
               , `sentiment: ${sentiment}`
               , `personality: ${personality}`
               , `speaker: ${speaker}`)

    // Get primary and secondary emotions, and their intensities
    let emotions = emotion[0]
    let sortedEmotions = [['joy', 0.5], ['surprise', 0.5]] // default

    // Rank emotions in sorted array: most intense to least intense
    let keys = Object.keys(emotions)
    sortedEmotions = keys.map(key => emotions[key])
      .sort().reverse().map(intensity => {
      for (let e in emotions) {
        if (emotions[e] === intensity) return [e, intensity]
      }
    })

    //Get the dominant personality
    let personalityTraits = personality[0]
    var primPersonality = "openness"

    //Primary personality
     for (var trait in personalityTraits) {
       if (personalityTraits[trait] > personalityTraits[primPersonality]) {
         primPersonality = trait
       }
     }

    // Emotion and sentiment info
    let primEmo = sortedEmotions[0][0]  //primary emotion
    let primInt = sortedEmotions[0][1]  //primary emotion's intensity
    let sentScore = sentiment[0]        //sentiment score

    
    // Update store with new indico data
    store.dispatch(primaryEmotion(primEmo))
    store.dispatch(primaryIntensity(primInt))
    store.dispatch(primaryPersonality(primPersonality))
    store.dispatch(updateSentiment(sentScore))
    store.dispatch(updateSpeaker(speaker))
  }
  )
}
