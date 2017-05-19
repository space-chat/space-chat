'use strict'

import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'

import store from './store.jsx'

import Home from './components/Home.jsx'
import Room from './components/Room.jsx'
import Title from './components/TitleSlide.jsx'
import NotFound from './components/NotFound.jsx'

render(
  <Provider store={store} >
    <Router history={browserHistory}>
      <Route path="/" component={Home} />
      <Route path="/room" component={Room} />
      <Route path="/title" component={Title} />
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('app')
)
