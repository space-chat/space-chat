import React, { Component } from 'react'
import Scene from './Scene'
window.API_KEY = require('../config.js').peerjs.key //api key
// window.call = JSON.stringify(call, null, 2)

export default class Call extends Component {
    constructor(props) {
        super(props)

        this.toJSON = this.toJSON.bind(this)
        this.removePeer = this.removePeer.bind(this)
    }

    toJSON() {
        return { id: this.id, started: this.started, peers: this.peers }
    }

    removePeer(peerId) {
        var index = this.peers.lastIndexOf(peerId);
        if (index !== -1) this.peers.splice(index, 1);
    }

    render() {
        return (
            <div>
                <div><h1>HI</h1></div>
                <div><Scene /></div>
            </div>
        )
    }


}


