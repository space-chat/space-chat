var express = require('express')
var app = express()
var path = require('path')
var server = require('http').Server(app)
var io = require('socket.io')(server)
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))

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
  })
})

io.on('join', (socket) => {
  console.log('socket joined room!')
})

// io.on('connection', (socket) => {
//   console.log("YEAHHHH BABY WE LIVE. here's my id", socket.id)
// })

server.listen(3002, () => {
    console.log("listening on 3002 hey girrrlll")
})
