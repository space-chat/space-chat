window.fire = require('../firebase')
import firebase from '../firebase'
import React from 'react'
import {render} from 'react-dom'
import ChatRoom from './ChatRoom'

render(
<ChatRoom />,
  document.getElementById("app")
)
