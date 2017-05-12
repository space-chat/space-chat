import io from 'socket.io-client'

const socket = io()

export function joinRoom (language) {
  socket.emit('join', language)
}

export function sendMessage (messageText, lang) {
  socket.emit('message', { messageText, lang, socketId: socket.id })
}

export function receiveMessage (clientLang) {
  socket.on('got message', ({ translatedBool, messageText, lang, socketId }) => {
    // if lang in 'got message' payload matches socket user's language
    console.log('client: ', clientLang, socket.id, 'incoming: ', lang, socketId)
    // and the original message didn't originate from this client
    if (clientLang === lang && socket.id !== socketId) {
      // speak text from 'got message' payload
      var utterance = new SpeechSynthesisUtterance(messageText)
      window.speechSynthesis.speak(utterance)
    }
    console.log(`translated? ${translatedBool}`, `text: ${messageText}`, `language: ${lang}`)
  })
}

export function receiveSentiment () {
  socket.on('got sentiment', ({ emotion, sentiment, personality }) => 
    // TO DO: update view with sentiment data
    console.log(`emotion: ${emotion}`, `sentiment: ${sentiment}`, `personality: ${personality}`)
  )
}
