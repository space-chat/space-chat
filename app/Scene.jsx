import React from 'react'  //dis be react
import io from './sockets' //dis be socket.io's client side plugin. 

import listenForSpeech from './speech_to_text.jsx'

const Scene =  () => {
  let socket = io()     //invoke io to create a socket...something that can listen for events and emit events.


  listenForSpeech()


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

export default Scene

//Just some thoughts/notes...
//How I would imagine the flow...

//1. 
