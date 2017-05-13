var express = require('express')
var app = express()
var path = require('path')
var server = require('http').Server(app)
var io = require('socket.io')(server)
var bodyParser = require('body-parser')

var indico = require('indico.io');
indico.apiKey = 'b895b4cf93b2701d2b26c5e918f141e2'


// import the Google Cloud Translate API
const Translate = require('@google-cloud/translate')
// instantiate a client
const projectId = 'space-chat-166520'
const translate = Translate({
  projectId: projectId,
  keyFilename: process.env.GOOGLE_API_KEY_FILE
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
    socket.emit('got message', { translatedBool, messageText, lang })
    //see indicoroutes.js for more info about the apis...
    indico.analyzeText([messageText], { apis: ["personality", "sentiment", "emotion"] })
      .then(data => {
        console.log('DATA', data)
        //io.emit sends to all users
        io.emit('got sentiment', data)
      })
      .catch(console.error)
      
    // 1) immediately send message exactly as received to all OTHER sockets
    socket.broadcast.emit('got message', { translatedBool, messageText, lang })

    // 2) send text to API for translation
    languages.forEach(targetLang => {
      console.log('target lang in server state array: ', targetLang, 'orig lang: ', lang)
      if (targetLang !== lang ) {
        console.log('server translating message into ', targetLang)
        translate.translate(messageText, targetLang)
          .then(results => {
            // 3a) emit each translation to all other sockets
            let translation = results[0]
            console.log('translation successful: ', translation)
            // broadcast.emit sends to OTHER sockets, NOT original sender
            socket.broadcast.emit('got message', { 
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
