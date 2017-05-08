import React, { Component } from 'react'
import { Link } from 'react-router'
import Call from './call'

var uuid = require('uuid')

export default class AppContainer extends Component {
	constructor() {
		super()

        this.state = {
          id: 0,
          started: 0,
          peers: []
        }
    }

    componentWillMount() {
        this.setState({
          id: 1234,
          started: Date.now(),
          peers: []
        })
	}

	// adding a peer to the call
	componentDidMount() {
		var peerId = new uuid.v1()
		this.state.peers.push(peerId)
	}

	render() {
		return (
			<div>
				<Call />
			</div>
		)
	}
}
