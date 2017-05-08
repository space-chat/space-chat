import React, { Component } from 'react'
import Scene from './Scene.jsx'
import Chat from './Chat.jsx'
import axios from 'axios'

export default class AppContainer extends Component {
  constructor() {
    super()

    this.state = {
      text: '',
      inputLang: '',
      outputLang: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleOutputChange = this.handleOutputChange.bind(this)
    console.log("HELLO I AM CHATROOM")
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log("STATE", this.state)
    axios.post('http://localhost:9999/2', this.state)
      .then(res => {
        console.log(res.data)
      })
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value })
  }

  handleInputChange(e) {
    this.setState({ inputLang: e.target.value })
  }

  handleOutputChange(e) {
    this.setState({ outputLang: e.target.value })
  }

  render() {
    console.log("HELLO I AM CHATROOM")

    return (
      <div>
        <div>
          <Chat />
        </div>
        <div>
          <Scene />
        </div>
      </div>
    )
  }
}
