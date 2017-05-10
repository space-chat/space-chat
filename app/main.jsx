
'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import store from './store.jsx'

import NotFound from './components/NotFound.jsx'
import Home from './Home.jsx'
import Room from './Room.jsx'


render(
  <Provider store={store} >
    <Router history={browserHistory}>
      <Route path="/" component={Home} />
      <Route path="/room" component={Room} />
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('app')

)