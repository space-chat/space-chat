import io from 'socket.io-client';

let socket = io()

function socketJoinRoom () {
  socket.emit('join', lang)
}

function socketSendMessage() {
  socket.emit('message', speechText)
}

function socketReceiveMessage() {
  socket.on('got message', ({ translated, text, lang }) =>
    if (lang === )
    )
}

function socketReceiveSentiment() {
  socket.on('got sentiment', data => console.log(data))
}

export default io;
