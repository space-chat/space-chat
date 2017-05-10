var express = require('express')
var app = express()
var path = require('path')
var server = require('http').Server(app)
var io = require('socket.io')(server)
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res, next) => {
  res.send("hi hi hi")
})

// server "State"
let languages = []

// when a socket connects, emit message back to that socket
io.on('connection', (socket) => {
  console.log('a portal has been opened between two realities')
  socket.emit('message', 'hello i am your message')

  // server listens for join event from client
  // socket adds language to languages array
  socket.on('join', (langData) => {
    console.log("YEAHHHH BABY WE LIVE. here's my id", socket.id)
  	languages.push(langData.language)
  })

  // server listens for message 
  socket.on('message', (spokenText) => {
    console.log('a message has been recieved')
  	console.log('message data is', spokenText)

    let text = spokenText.text
    let language = spokenText.language

    serverReceivedMessage(text, language)
  })

  // server emits got message event on message received
  function serverReceivedMessage(text, language) {
    socket.emit('got message', {
      translatedBool: false,
      text: text,
      language: language
    })
  }

  // server listens for sentiment from api ?
  socket.on('sentiment', (data) => {
    console.log('sentiment data received: ', data)

    // handle data to be emitted to client

    serverReceivedSentiment(dataStuff)
  })

  // server emits sentiment data to client via websockets
  function serverReceivedSentiment(dataStuff) {
    socket.emit('got sentiment', dataStuff)
  }

})


server.listen(3002, () => {
    console.log("listening on 3002 hey girrrlll")
})
