import io from 'socket.io-client'
import store from './store.jsx'
import { primaryEmotion, secondaryEmotion, primaryIntensity, secondaryIntensity, primaryPersonality, updateExtraversion, updateOpenness, updateConscientiousness, updateAgreeableness, updateSentiment, updateSpeaker } from './reducers/sentimentReducer.jsx'

// enable text-to-speech in browser
const synth = window.speechSynthesis
let voices

let socket

export function openSocket() {
  socket = io()
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

export function startPeer(peerId) {
  socket.emit('start peer', peerId)
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

    //Get the dominant personality
    let personalityTraits = personality[0]
    let keys2 = Object.keys(personalityTraits)
    var primPersonality = "openness"

     for (var trait in personalityTraits) {
       if (personalityTraits[trait] > personalityTraits[primPersonality]) {
         primPersonality = trait
       }
     }

    // Get other indico info
    let primEmo = sortedEmotions[0][0]  //primary emotion
    let secEmo = sortedEmotions[1][0]   //secondary emotion
    let primInt = sortedEmotions[0][1]  //primary emotion's intensity
    let secInt = sortedEmotions[1][1]   //secondary emotion's intensity
    let extraversion = personality[0].extraversion || 0.001
    let openness = personality[0].agreeableness || 0.001
    let conscientiousness = personality[0].agreeableness || 0.001
    let agreeableness = personality[0].agreeableness || 0.001
    let sentScore = sentiment[0]        //sentiment score

    
    // update store with new indico data
    store.dispatch(primaryEmotion(primEmo))
    store.dispatch(secondaryEmotion(secEmo))
    store.dispatch(primaryIntensity(primInt))
    store.dispatch(secondaryIntensity(secInt))
    store.dispatch(primaryPersonality(primPersonality))
    store.dispatch(updateExtraversion(extraversion))
    store.dispatch(updateOpenness(openness))
    store.dispatch(updateConscientiousness(conscientiousness))
    store.dispatch(updateAgreeableness(agreeableness))
    store.dispatch(updateSentiment(sentScore))
    store.dispatch(updateSpeaker(speaker))
  }
  )
}
