var express = require('express')
var app = express()
var path = require('path')
var server = require('http').Server(app)
var io = require('socket.io')(server)
var bodyParser = require('body-parser')

// import and authenticate with Indico Text APIs
var indico = require('indico.io')
indico.apiKey = 'e5feeac8e479a303fab000f4b7e0287c'

// import the Google Cloud Translate API
const Translate = require('@google-cloud/translate')
// instantiate a client
const projectId = 'space-chat-166520'
const translate = Translate({
  projectId: projectId,
  keyFilename: './servicekey.json'
}) 

// set up body parsing middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// serve up static files
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res, next) => {
  res.send("hi hi hi")
})

// store languages of connected sockets ("state")
let languages = []

// when a socket connects, listen for messages
io.on('connection', socket => {
  console.log('new socket ', socket.id, ' connected')

  socket.on('close me', language => {
    console.log('disconnecting socket with language ', language)
    // if this is the only socket left in a language channel
    if (io.sockets.adapter.rooms[language].length === 1)
      // remove that language from state
      languages = languages.filter(lang => lang !== language)
    console.log('all languages on server state are: ', languages)
    // close socket
    socket.disconnect()
  })

  // when a socket joins room
  socket.on('join request', language => {
    console.log('socket ', socket.id, ' joined room! lang: ', language)
    // check that language choice is not empty, and not already stored
      // ^ the first part of this check may no longer be necessary, due to the lang default bug fix
    if (language && languages.indexOf(language) === -1)
      // 1) store socket's selected language server-side
      languages.push(language)
    console.log(`currently connected: ${Object.keys(io.sockets.sockets)}`)
    console.log('all languages on server state are: ', languages)
    // 2) subscribe socket to language channel
    socket.join(language)
    console.log(`clients subscribed to ${language} channel are:
      ${Object.keys(io.sockets.adapter.rooms[language].sockets)}`)
  })

  // when a socket sends a spoken message as text
  socket.on('message', ({ messageText, lang }) => {
    console.log('new spoken message! server emitting original text: ', messageText)
    let translatedBool = false
      
    // 1) immediately send message exactly as received to all OTHER sockets in original language channel
    socket.to(lang).emit('got message', { translatedBool, messageText, lang })

    // 2) send text to API for translation
    languages.forEach(targetLang => {
      console.log('target lang in server state array: ', targetLang, 'orig lang: ', lang)
      if (targetLang !== lang ) {
        console.log('server translating message into ', targetLang)
        translate.translate(messageText, targetLang)
          .then(results => {
            // 3a) emit each translation to each language channel
            let translation = results[0]
            console.log('translation successful: ', translation)
            // server sends to all sockets in language channel
            io.in(targetLang).emit('got message', { 
              translatedBool: true, 
              messageText: translation, 
              lang: targetLang })
          })
          .catch(console.error)
      }
    })

    // 3) send text to indico for analysis
    indico.analyzeText([messageText], { apis: ["personality", "sentiment", "emotion"] })
      .then(data => {
        console.log("DATA", data)
        // io.sockets.emit sends to ALL sockets, INCL original sender
        io.sockets.emit('got sentiment', data)
      })
      .catch(console.error)

  })
})

server.listen(process.env.PORT || 3002, () => {
  console.log("listening on 3002 hey girrrlll")
})
