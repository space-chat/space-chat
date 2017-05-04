const firebase = require('firebase')

var config = {
    apiKey: "AIzaSyCPXVLO8fKI5ALaSaaC9sGw_kr5IAXDSds",
    authDomain: "space-chat-166520.firebaseapp.com",
    databaseURL: "https://space-chat-166520.firebaseio.com",
    projectId: "space-chat-166520",
    storageBucket: "space-chat-166520.appspot.com",
    messagingSenderId: "881297352573"
};

firebase.initializeApp(config);

// Auto-authenticate
firebase.auth().onAuthStateChanged(user => user || firebase.auth().signInAnonymously())

module.exports = firebase