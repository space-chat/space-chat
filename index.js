var express = require('express')
var app = express()
var path = require('path')
var server = require('http').Server(app)
var io = require('socket.io')(server)
var bodyParser = require('body-parser')

// import and authenticate with Indico Text APIs
var indico = require('indico.io');
indico.apiKey = require('./indicokey.js')

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
io.on('connection', (socket) => {
  console.log('new socket ', socket.id, ' connected')

  // when a socket joins room, store selected language of that socket
  socket.on('join', language => {
    console.log('socket ', socket.id, ' joined room! lang: ', language)
    // check that language choice is not empty, and not already stored
    if (language && languages.indexOf(language) === -1)
      languages.push(language)
    console.log('all languages on server state are: ', languages)
  })

  // when a socket sends a spoken message as text
  socket.on('message', ({ messageText, lang }) => {
    console.log('new spoken message! server emitting original text: ', messageText)
    let translatedBool = false
    // 1) immediately emit message exactly as received to all other sockets
    socket.emit('got message', { translatedBool, messageText, lang })

    // 2) send text to indico for analysis
    // (langs: 'en', 'zh', 'de', 'es', 'fr', 'it', 'ja', 'ru', 'ar', 'nl', 'ko', 'pt')
    indico.analyzeText([messageText], { apis: ["personality", "sentiment", "emotion"] })
      .then(data => {
        console.log("DATA", data)
        // here--do we want to emit or broadcast?
        // ^ io.sockets.emit should broadcast to ALL sockets, incl original sender
        io.sockets.emit('got sentiment', data)
      })
      .catch(console.error)

    // 3) send text for translation
    languages.forEach(targetLang => {
      if (targetLang !== lang ) {
        console.log('server translating message into ', targetLang)
        translate.translate(messageText, targetLang)
          .then(results => {
            // 3a) emit each translation to all other sockets
            let translation = results[0]
            console.log('translation successful: ', translation)
            console.log('server emitting translation')
            socket.broadcast.emit('got message', { 
              translatedBool: true, 
              messageText: translation, 
              lang: targetLang })
          })
          .catch(console.error)
      }
    })
  })
})

server.listen(process.env.PORT || 3002, () => {
  console.log("listening on 3002 hey girrrlll")
})
