import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import Call from './Call'
import AppContainer from './AppContainer'

const routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer} />
    <Route path="/new" component={Call} />
  </Router>
)

export default routes
