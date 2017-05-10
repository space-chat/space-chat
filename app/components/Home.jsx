import React, { Component } from 'react' 
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { setLanguage } from '../reducers/languageReducer.jsx'

class Home extends Component {
	constructor() {
		super()
    this.state = {}
    this.onChange = this.onChange.bind(this)
	}

  onChange(e) {
    // dispatch action with language
    this.props.setLanguage(e.target.value)
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

export default connect(null, {setLanguage})(Home)
