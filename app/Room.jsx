// Room sends props to Scene (sentiment analysis data for Scene to change)

import React, { Component } from 'react'
import Scene from './Scene.jsx'
const io = require('socket.io-client') //dis be socket.io's client side plugin
const socket = io()

export default class Room extends Component {

  constructor() {
    super()

    this.state = {

    }
  }

  componentWillMount() {
    socket.on('connect', () => {
      console.log('a two-way connection with the server has been established!')
    })
  }

  render() {
    return (
      <Scene />
    )
  }
}

/* --------------------------------

- Should Room be an instance of EventEmitter? e.g. window.room = new window.EventEmitter()

- Room sends text to server via socket -- socket.emit('transcription', payload)
- Room gets sentiment data from the server via socket
- Room sends sentiment data via props to Scene so that Scene updates accordingly

-------------------------------- */
