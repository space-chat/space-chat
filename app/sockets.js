import io from 'socket.io-client'

const socket = io()

export function joinRoom (language) {
  socket.emit('join', language)
}

export function sendMessage (spokenText) {
  // does google translate api need to know language of incoming text?
  socket.emit('message', spokenText)
}

export function receiveMessage () {
  socket.on('got message', ({ translatedBool, text, lang }) =>
    // if lang in 'got message' payload matches socket user's language
      // speak text from 'got message' payload
    console.log(`translated? ${translatedBool}`, `text: ${text}`, `language: ${lang}`)
  )
}

export function receiveSentiment () {
  socket.on('got sentiment', ({ score, magnitude, entities }) => 
    // update view with sentiment data
    console.log(`score: ${score}`, `magnitude: ${magnitude}`, `entities: ${entities}`)
  )
}
