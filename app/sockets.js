import io from 'socket.io-client'

const socket = io()

export function joinRoom (language) {
  socket.emit('join', language)
}

export function sendMessage (messageText, lang) {
  socket.emit('message', { messageText, lang })
}

export function receiveMessage (clientLang) {
  socket.on('got message', ({ translatedBool, messageText, lang }) => {
    // if lang in 'got message' payload matches socket user's language
    if (clientLang === lang && translatedBool) {
      // speak text from 'got message' payload
      var utterance = new SpeechSynthesisUtterance(messageText)
      window.speechSynthesis.speak(utterance)
    }
  })
}

export function receiveSentiment () {
  socket.on('got sentiment', ({ emotion, sentiment, personality }) => 
    // TO DO: update view with sentiment data
    console.log(`emotion: ${emotion}`, `sentiment: ${sentiment}`, `personality: ${personality}`)
  )
}
