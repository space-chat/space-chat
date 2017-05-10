import React, { Component } from 'react' 
import { Link } from 'react-router'

export default class Home extends Component {
	constructor() {
		super()
    this.state = {
      language: ''
    }
    this.onChange = this.onChange.bind(this)
	}

  onChange(e) {
    this.setState({language: e.target.value})
  }

	render() {
		return (
		<div>
      <h1>SPACE CHAT</h1>
      <form>
        <h3>Select your language:</h3>
        <select onChange={this.onChange}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
        </select>
        </form>
        <div>
          {/* need to pass language as prop to Room */}
          <Link to="/room" className="btn">Enter Space Chat</Link>
        </div>
		</div>
		)
	}
}
