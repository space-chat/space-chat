var express = require('express')
var app = express()
var path = require('path')
var server = require('http').Server(app)
var io = require('socket.io')(server)
var bodyParser = require('body-parser')
// var axios = require('axios')

var indico = require('indico.io');
indico.apiKey = require('./indicokey').api_key
// Imports the Google Cloud client library
const Translate = require('@google-cloud/translate')
// provides project id
const projectId = 'space-chat-166520'
// Instantiates a client
const translate = Translate({
  projectId: projectId,
  keyFilename: './servicekey.json'
}) 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))

// app.use('/api/analysis', require('./indicoroutes'))

app.get('/', (req, res, next) => {
  res.send("hi hi hi")
})

// store languages "State"
let languages = []

// when a socket connects, emit message back to that socket
io.on('connection', (socket) => {
  console.log('new socket connected')
  socket.on('join', language => {
    console.log('socket joined room! lang: ', language)
    languages.push(language)
    console.log('languages on state are: ', languages)
  })
  socket.on('message', ({ messageText, lang }) => {
    console.log('new spoken message! text: ', messageText)
    let translatedBool = false
    socket.emit('got message', { translatedBool, messageText, lang })
    //see indicoroutes.js for more info about the apis...
    indico.analyzeText([messageText], { apis: ["personality", "sentiment", "emotion"] })
      .then(data => {
        console.log("DATA", data)
        //Here--do we want to emit or broadcast?
        socket.emit('got sentiment', data)
      })
      .catch(console.error)
    // send text to translation
    languages.forEach(targetLang => {
      if (targetLang !== lang ) {
        console.log('translating into ', targetLang)
        translate.translate(messageText, targetLang)
          .then(results => {
            console.log('results are', results)
            let translation = results[0]
            translatedBool = true
            socket.emit('got message', { translatedBool, messageText: translation, lang: targetLang })
          })
          .catch(console.error)
      }
    })

  })
})

server.listen(3002, () => {
  console.log("listening on 3002 hey girrrlll")
})
