import React, { Component } from 'react'
import ChatProxy from './src/models/ChatProxy'
import ChatBox from './ChatBox.jsx'

export default class App extends Component {

    constructor() {
        super()
        this.state = {
            shouldShowChatbox: false, 
            username: ''
        }
        this.onClick = this.onClick.bind(this)
    }

    onClick() {
        this.setState({ shouldShowChatbox: true })  //renders ChatBox depending on what the state is...
        this.setUsername = this.setUsername.bind(this)
    }

    setUsername(e) {
        this.setState({username: e.target.value})
    }

    render() {

        const homepage = <div>
            <section id="container">
                <div className="reg-form-container">
                    <label htmlFor="username-input">Username</label>
                    <input type="text" id="username-input" className="form-control" value={this.state.username} onChange={this.setUsername}/>
                    <br />
                    <button id="connect-btn" className="btn btn-primary">Connect</button>
                </div>
            </section>
        </div>

        return (
            <div>
                {
                    this.state.shouldShowChatbox ? <ChatBox chatProxy={new ChatProxy()} username={this.state.username} onClick={this.onClick} /> : homepage
                }
            </div>
        )
    }
}