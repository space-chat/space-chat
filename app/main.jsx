'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import store from './store.jsx'

import AppContainer from './components/AppContainer.jsx'
import NotFound from './components/NotFound.jsx'


render(
  <Provider store={store} >
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer} />
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('app')
)