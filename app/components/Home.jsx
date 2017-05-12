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
		<div className="wrapper">
      <h3>You are about to enter a virtual experience in which users from across the world will understand your language, and where space itself will understand how you feel.</h3>
      <div className="form-group">
        <label className="col-lg-2 control-label">Select your language:</label>
          <select onChange={this.onChange}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </select>
        
        </div>
        <div>
          {/* need to pass language as prop to Room */}
          <h4><Link to="/room" className="btn">Enter Space Chat</Link></h4>
        </div>
		</div>
		)
	}
}

export default connect(null, {setLanguage})(Home)
