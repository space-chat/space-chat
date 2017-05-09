import React from 'react'
import { Router, Route, browserHistory } from 'react-router'

import Home from './Home'
import Room from './Room'

render (
  <Router history={browserHistory}>
    <Route path="/" component={Home} />
    <Route path="/room" component={Room} />
  </Router>,
	document.getElementById('app')
)