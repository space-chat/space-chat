import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { render } from 'react-dom'

import Home from './Home.jsx'
import Room from './Room.jsx'

render (
  <Router history={browserHistory}>
    <Route path="/" component={Home} />
    <Route path="/room" component={Room} />
  </Router>,
	document.getElementById('app')
)