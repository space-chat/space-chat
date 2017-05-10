const socket = {
  joinRoom: function (language) {
    socket.emit('join', language)
  },

  sendMessage: function (spokenText) {
    // does google translate api need to know language of incoming text?
    socket.emit('message', spokenText)
  },

  receiveMessage: function () {
    socket.on('got message', ({ translatedBool, text, lang }) =>
      // if lang in 'got message' payload matches socket user's language
        // speak text from 'got message' payload
      console.log(`translated? ${translatedBool}`, `text: ${text}`, `language: ${lang}`)
    )
  },

  receiveSentiment: function () {
    socket.on('got sentiment', ({ score, magnitude, entities }) => 
      // update view with sentiment data
      console.log(`score: ${score}`, `magnitude: ${magnitude}`, `entities: ${entities}`)
    )
  }
}

export default socket
