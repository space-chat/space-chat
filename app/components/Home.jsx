import React, { Component } from 'react' 
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { setLanguage } from '../reducers/languageReducer.jsx'
import { openSocket } from '../sockets.js'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      language: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleLanguageChange = this.handleLanguageChange.bind(this)
  }

  handleClick(e) {
    // dispatch action with language from state
    this.props.setLanguage(this.state.language || 'en')
  }

  handleLanguageChange(e) {
    // set selected language on state
    this.setState({ language: e.target.value })
  }

	render() {
		return (
  		<div className="wrapper">
        <h3>You are about to enter a virtual experience in<br />which users from across the world will<br />understand your language.<br /><br />And where space will understand how you feel.</h3>
        <br />
        <br />
        <br />
        <div className="form">
          <label className="control-label">Select your language:</label>
        </div>
        <div>
          {/* need to pass language as prop to Room */}
          <select className="form-control" id="select"onChange={this.handleLanguageChange}>
            <option value='en'>English</option>
            <option value='es'>Spanish</option>
            <option value='zh'>Chinese</option>
            <option value='ar'>Arabic</option>
            <option value='de'>German</option>
            <option value='fr'>French</option>
            <option value='it'>Italian</option>
            <option value='pt'>Portuguese</option>
            <option value='nl'>Dutch</option>
            <option value='ja'>Japanese</option>
            <option value='ko'>Korean</option>
            <option value='ru'>Russian</option>
          </select>
        </div>
        <br />
        <br />
        <br />
        <Link className="btn btn-default" role="button" to="/room" onClick={this.handleClick}>ENTER SPACECHAT</Link>
  		</div>
		)
	}
}

export default connect(null, {setLanguage})(Home)
