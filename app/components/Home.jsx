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
      <h3>You are about to enter a virtual experience in<br />which users from across the world will<br />understand your language.<br /><br />And where space will understand how you feel.</h3>
      <br />
      <br />
      <br />
      <form className="form-horizontal">
        <div className="form-group">
          <div>
            <label className="control-label">Select your language:</label>
          </div>
          <div className="col-md-2">
            <select className="form-control" id="select" onChange={this.onChange}>
              <option value="en">English</option>
              <option value="es">Spanish</option>
            </select>
          </div>
        </div>
      </form>
      <Link className="btn btn-default" role="button" to="/room">ENTER SPACECHAT</Link>
		</div>
		)
	}
}

export default connect(null, {setLanguage})(Home)
