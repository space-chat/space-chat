var express = require('express')
var app = express()
var path = require('path')
var server = require('http').Server(app)
var io = require('socket.io')(server)
var bodyParser = require('body-parser')
// var axios = require('axios')

var indico = require('indico.io');
indico.apiKey = require('./indicokey').api_key

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))

// app.use('/api/analysis', require('./indicoroutes'))

app.get('/', (req, res, next) => {
  res.send("hi hi hi")
})

// when a socket connects, emit message back to that socket
io.on('connection', (socket) => {
  console.log('new socket connected')
  socket.on('join', language => {
    console.log('socket joined room! lang: ', language)
  })
  socket.on('message', ({ spokenText, lang }) => {
    console.log('new spoken message! text: ', spokenText)
    let translatedBool = false
    socket.emit('got message', { translatedBool, spokenText, lang })
    //see indicoroutes.js for more info about the apis...
    indico.analyzeText([spokenText], { apis: ["personality", "sentiment", "emotion"] })
      .then(data => {
        console.log("DATA", data)
        //Here--do we want to emit or broadcast?
        socket.emit('got sentiment', data)
      })
      .catch(console.error)
  })
})

server.listen(3002, () => {
  console.log("listening on 3002 hey girrrlll")
})
