'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

// import store from './store'

import AppContainer from './components/AppContainer.jsx'
import NotFound from './components/NotFound.jsx'


render(
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer} />
      <Route path='*' component={NotFound} />
    </Router>,
  document.getElementById('app')
)