const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const firebase = require('./firebase')

// Imports the Google Cloud client library
const Translate = require('@google-cloud/translate')
// Instantiates a client
const translate = Translate()

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) // for AJAX requests

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res, next) => {
  res.sendFile('index.html')
})

// send text to google translate API
firebase.database().ref('messages').on('child_added', (snapshot) => {
  // The text to translate, e.g. "Hello, world!"
  // const {text} = snapshot.val()
  const text = "testing testing 123"
  // The target language, e.g. "ru"
  const target = 'fr'

  if (!text) return
  console.log('translating "%s" into %s', text, target)

  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  translate.translate(text, target)
    .then((results) => {
      let translations = results[0]
      translations = Array.isArray(translations) ? translations : [translations]

      console.log('Translations:')
      translations.forEach((translation, i) => {
        console.log(`${text[i]} => (${target}) ${translation}`)
      })
      return snapshot.ref.update({[target]: translations})
    })
    .catch((err) => {
      console.error('ERROR:', err)
    })
})

app.listen(3000, function () {
    console.log('LISTENING ON PORT 3000')
})