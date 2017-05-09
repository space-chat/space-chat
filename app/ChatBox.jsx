'use strict';
import React, { Component } from 'react'

export default class ChatBox extends Component {

    constructor() {
        super()

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.chatProxy = this.props.chatProxy;
        this.chatProxy.connect(this.props.username);
        this.chatProxy.onMessage(this.addMessage.bind(this));
        this.chatProxy.onUserConnected(this.userConnected.bind(this));
        this.chatProxy.onUserDisconnected(this.userDisconnected.bind(this));
    }

    userConnected(user) {
        var users = this.state.users;
        users.push(user);
        this.setState({
            users: users
        })
    }

    userDisconnected(user) {
        var users = this.state.users;
        users.splice(users.indexOf(user), 1);
        this.setState({
            users: users
        })
    }

    messageHandler(message) {
        message = this.refs.messageInput.getDOMNode().value;
        this.addMessage({
            content: message,
            author: this.chatProxy.getUsername()
        });
        this.chatProxy.broadcast(message);
    }

    // addMessage(message) {
    //     if (message) {
    //         message.date = new Date();
    //         this.refs.messagesList.addMessage(message);
    //     }
    // }

    render() {
        return (
            <div className="chat-box" ref="root">
                <div className="chat-header ui-widget-header">React p2p Chat</div>
                <div className="chat-content-wrapper row">
                    <UsersList users={this.state.users} ref="usersList"></UsersList>
                </div>
                <MessageInput
                    ref="messageInput"
                    messageHandler={this.messageHandler}>
                </MessageInput>
            </div>
        );
    }
}
  