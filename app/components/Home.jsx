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
        <select onChange={this.handleLanguageChange}>
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
      </form>
      <div>
        <Link to='/room' className='btn' onClick={this.handleClick}>Enter Space Chat</Link>
      </div>
    </div>
    )
  }
}

export default connect(null, {setLanguage})(Home)
