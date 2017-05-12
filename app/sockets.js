import io from 'socket.io-client'

const socket = io()

export function joinRoom (language) {
  socket.emit('join', language)
}

export function sendMessage (messageText, lang) {
  socket.emit('message', { messageText, lang, socketId: socket.id })
}

export function receiveMessage (clientLang) {
  socket.on('got message', ({ translatedBool, messageText, lang }) => {
    // if lang in 'got message' payload matches socket user's language
    console.log('RECEIVING MESSAGE FROM SERVER')
    console.log('original lang' , lang)
    console.log('i am socket', socket.id, 'with lang ', clientLang)
    if (clientLang === lang) {
      // speak text from 'got message' payload
      console.log('SPEAKING TEXT...')
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
