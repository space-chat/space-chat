'use strict'
import io from 'socket.io-client'

import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'

import store from './store.jsx'

import Home from './components/Home.jsx'
import Room from './components/Room.jsx'
import NotFound from './components/NotFound.jsx'

// when app loads, open socket
const onHomeEnter = () => {
  window.socket = io()
}

render(
  <Provider store={store} >
    <Router history={browserHistory}>
      <Route path="/" component={Home} onEnter={onHomeEnter}/>
      <Route path="/room" component={Room} />
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('app')
)
