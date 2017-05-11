import io from 'socket.io-client'

const socket = io()

export function joinRoom (language) {
  socket.emit('join', language)
}

export function sendMessage (spokenText, lang) {
  // does google translate api need to know language of incoming text?
  socket.emit('message', { spokenText, lang })
}

export function receiveMessage () {
  socket.on('got message', ({ translatedBool, spokenText, lang }) =>
    // if lang in 'got message' payload matches socket user's language
      // speak text from 'got message' payload
    console.log(`translated? ${translatedBool}`, `text: ${spokenText}`, `language: ${lang}`)
  )
}

export function receiveSentiment () {
  socket.on('got sentiment', ({ emotion, sentiment, personality }) => 
    // update view with sentiment data
    console.log(`emotion: ${emotion}`, `sentiment: ${sentiment}`, `personality: ${personality}`)
  )
}
