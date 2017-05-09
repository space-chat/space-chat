var path = require('path');
var express = require('express');
var app = express();
var server = require('http').Server(app)
var io = require('socket.io')(server)
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.send("hi hi hi")
})

io.on('connection', function(socket){
  console.log('A new client has connected')
  console.log('socket id:', socket.id)

  socket.emit('connect', { msg: 'A two-way connection has been established!'})

  socket.on('disconnect', function() {
  	console.log('socket id ' + socket.id + ' has disconnected.')
  })
  
});


// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     socket.broadcast.emit('chat message', msg);
//   });
// });


server.listen(3002, function () {
    console.log("listening on 3002 hey girrrlll")
});
