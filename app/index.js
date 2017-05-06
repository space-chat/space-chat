// window.fire = require('./firebase')
// import firebase from './firebase'
import React from 'react'
import ReactDOM from 'react-dom'
import Scene from './scene'
import ChatBox from './chatbox'

ReactDOM.render(
  <Scene />,
  <ChatBox />,
  document.getElementById("app")
)
