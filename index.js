window.fire = require('./firebase')
import firebase from './firebase'
import React from 'react'
import {render} from 'react-dom'
import Colortest from './colortest'

render(<Colortest magnitude={0.1} score={0.4}/>, document.getElementById("app"))
