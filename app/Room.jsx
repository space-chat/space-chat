// Room sends props to Scene (sentiment analysis data for Scene to change)
import React from 'react'  //dis be react
const io = require('socket.io-client') //dis be socket.io's client side plugin. 
const KEY = require('../config.js').peerjs.key

const Room =  () => {
let socket = io()     //invoke io to create a socket...something that can listen for events and emit events.

//from the peer js client library linked in html
//Initiate a new peer connection using our peerjs api key
var peer = new Peer({
	key: KEY
})

//When a peer connection is created, use socket io to emit this connection's ID
//To the other person.  
peer.on('open', function(id) {
    console.log("dis be my peer id: " + id)
    socket.emit("peer id", id)
})

//Rest of this code needs work...

//axios.get('/peerid')
//.then(id => this.setState(peerid: id))

//Next the other person's server will connect using the id that was just emitted. 
// var conn = peer.connect(id)

// //Now the client will recieve the connection.
// peer.on('connection', function(conn) {
//     console.log("CONN", conn)
// })

// conn.on('open', function() {
//   // Receive messages
//   conn.on('data', function(data) {
//     console.log('Received', data);
//   });

//   // Send messages
//   conn.send('Hello!');
// });

console.log("PEER", peer)  //logs info about this peer, including their id


// console.log("CONN", conn)
  return (
    <div>
      <a-scene>
        <a-assets>
          <img id="flowerSky" src="blossoms.jpg" />
        </a-assets>
        <a-sphere position="-1 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
        <a-torus-knot position="3 0.6 -3" radius="0.5" height="1.5" color="#FFC65D"></a-torus-knot>
        <a-sky src="#flowerSky"></a-sky>
      </a-scene>
    </div>
  )
}

export default Room

//Just some thoughts/notes...
//How I would imagine the flow...

//1. 