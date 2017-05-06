const bodyParser = require('body-parser')
const firebase = require('./firebase')

// Imports the Google Cloud client library
const Translate = require('@google-cloud/translate')
// Instantiates a client
const translate = Translate()

const isConnected = firebase.database().ref(".info/connected")
isConnected.on('value', snap => console.log('Firebase',
  snap.val() ? 'Connected' : 'Disconnected'))


// const getSentiment = snapshot => {
//   console.log('in sentiment')
//   // Text to analyze, e.g. "Hello, world!"
//   const {text} = snapshot.val()
//   //const text = snapshot.child('text').val()
//    // If no 'text' key, ignore this entry, exit the function
//   if (!text) return
//   // Extracts score and magnitude sentiment values from text
//   console.log('text for sentiment is', text)
//   const content = language.document(text)
//   // Run sentiment analysis on text
//   return content.detectSentiment(text)
//     .then((results) => {
//       console.log('results in sentiment', results)
//       // Grabs relevant value from arr returned by API
//       let sentiment = results[0]
//       // Gets score and magnitude values
//       const score = sentiment.score;
//       const magnitude = sentiment.magnitude;
//       console.log('text is', text, 'score is', score, 'mag is', magnitude)

//       // Pushes new entry to database
//       return snapshot.ref.parent.push({
//         type: 'SENTIMENT',
//         score: score,
//         magnitude: magnitude,
//         done: true
//       })

//       return Promise.all(
//         [snapshot.ref.parent.push({
//           type: 'SENTIMENT',
//           done: true,
//           score: score,
//           magnitude: magnitude}),
//         snapshot.ref.update({ done: true })])

//     })
//     .catch((err) => {
//       console.error('ERROR:', err)
//     })
// }


const translateMessage = snapshot => {
  // Text to translate, e.g. "Hello, world!"
  const { text } = snapshot.val()
  // Two letters to represent target language, e.g. "ru"
  const target = 'id'
  // If no 'text' key, ignore this entry, exit the function
  if (!text) return

  // Translates the text into the target language
  // typeof text: 'text1' || [text1, text2, ...]
  console.log('translating "%s" into %s', text, target)
  let translation = ""
  return translate.translate(text, target)
    .then((results) => {
      // Grabs relevant value from arr returned by API
      translation = results[0]
      // Pushes new entry to database
      return Promise.all(
        [snapshot.ref.parent.push({
          type: 'TRANSLATION',
          done: true,
          [target]: translation
        }),
        snapshot.ref.update({ done: true })])
    })
    .then(() => {
      console.log("translation", translation)
      return translation
    })
    .catch((err) => {
      console.error('ERROR:', err)
    })
}

// Processes all unprocessed messages in current room
// const processRoom = ref => {
//   // Finds all messages not yet translated
//   ref.orderByChild('done')
//     .equalTo(null)
//     .limitToFirst(1)
//     // Sets temporary listener
//     .once('value')
//     // Sends messages to google translate API
//     .then(snap => {
//       // const val = snap.val()
//       console.log("snap", snap)
//       return translateMessage(snap)
//       //  return Promise.all(
//       //   Object.keys(val)
//       //     // Sends fake snapshot to translateMessage fxn
//       //     .map(key => translateMessage({
//       //       ref: snap.ref.child(key),
//       //       val() { return val[key] }
//       //     }))
//       //   )
//         // .then(translations => translations)
//     })
// }

const onceWeAreLoggedIn = new Promise((resolve, reject) => {
  const unsub = firebase.auth().onAuthStateChanged(user => {
    if (user) {
      resolve(user)
      unsub()
    }
  })
})

// const processIncomingMessage = data => {

// }

// Pings ghost server hosted on Heroku
require('express')()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5000")
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With")
    if ("OPTIONS" == req.method) {
      res.sendStatus(200);
    } else {
      next()
    }
  })
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .post('/:roomId', (req, res) => {
    console.log("REQ", req.body)
    onceWeAreLoggedIn
      .then(() => firebase.database().ref('rooms').child(req.params.roomId).push({
        text: req.body.text
      }))
      .then(() =>
        firebase.database().ref('rooms').child(req.params.roomId)
          .orderByChild('done')
          .equalTo(null)
          .limitToLast(1)
          // Sets temporary listener
          .once('value')
          .then(snap => {
          //   translateMessage({
          //   ref: snap.ref.child(key), 
          //   val() {return val[key]}
          // })
          console.log("SNAP.REF", snap.ref)
          })
      )
      .then((translation) => console.log("TRANSLATIONS", translation))
  })
  .listen(process.env.PORT || 9999)


