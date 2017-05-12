import React, { Component } from 'react' 
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { setLanguage } from '../reducers/languageReducer.jsx'

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
    <div>
      <h1>SPACE CHAT</h1>
      <form>
        <h3>Select your language:</h3>
        <select defaultValue='en' onChange={this.handleLanguageChange}>
          <option value='en'>English</option>
          <option value='es'>Spanish</option>
        </select>
      </form>
      <div>
        <Link to='/room' className='btn' onClick={this.handleClick}>Enter Space Chat</Link>
      </div>
    </div>
    )
  }
}

export default connect(null, {setLanguage})(Home)
