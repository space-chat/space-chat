/* --------------------
Redux and sockets

thunk - middleware that lets you write action creators that return a function instead of an action 

CONNECTING
start server
go to client 
enter room —> socket connection is established

ADDING ITEM
add item on client (text event) —> fires ‘text’ event
server is watching addText event (payload is the message text)
[new document is written to TodoList collection <— messages collection?]

if write is successful, even ‘itemAdded’ is dispatched to all connected sockets
client watches for ‘itemAdded’ event and dispatches the action to pass the new message to the reducer which updates the state and therefore the front-end component
---------------------- */

// server.js
// server listens for ‘newText’ event (fired from the reducer)
socket.on(‘newText’, (textData) => {
	// extracts data properties for translation 
	let language =  textData.language
	let text = textData.message
 	let completed = textData.completed
	
	// translates message and sets complete to true
	
	// fires ‘textTranslated event
	io.emit(‘textTranslated’, translation)

	// translation object 
	{
		language: translation.language
		message: translation.message
		completed: true
	}
}

// action.js
// reducer dispatches messageSocket action and fires ’newText’ event via socket
export const messageSocket = (socket, language, message) => {
	return (dispatch) => {
		language: language,
		message: message
		completed: false
		}
	socket.emit(‘newText’, textData)
	}
}

//Room.js
// client captures speech-to-text and dispatches ‘messageSocket’ action with socket, language, and message payload
// language was passed as props to Room from home component
 dispatch(messageSocket(socket, language, message))

// sockets - establish connection
// server.js
io.on(‘connection’, (socket) => {
	socket.on(‘joinRoom’, (data) => {
		let id = socket.id
	}
}

// from Transcend:
// server, index.js
// Setting up socket.io
const socketio = require('socket.io');
server.on('request', app);
const io = socketio(server);
require('./socket')(io);

// server, socket.io