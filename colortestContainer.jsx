import React, { Component } from 'react';

fire.sentiments = {}
fire.sentiments.ref = fire.database.ref('sentiments')

export default class extends Component {

	constructor() {
		super()
    this.state {
      score: null,
      magnitude: null
    }
	}

	componentDidMount() {
		firebase.database.ref.on('child_added', snapshot => {

			const score = snapshot.child('score').val()
      const magnitude = snapshot.child('magnitude').val

      this.setState({score, magnitude})

    }

  render() {
    return(
      <Colortest score={this.score} magnitude={this.magnitude} />
    )
  }
}