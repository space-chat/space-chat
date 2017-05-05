window.fire = require('./firebase')
import firebase from './firebase'
import React from 'react'
import {render} from 'react-dom'
import Colortest from './colortest'

render(<Colortest />, document.getElementById("app"))
