const express = require('express')
const app = express()

// Imports the Google Cloud client library
const language = require('@google-cloud/language')({
	projectId: 'space-chat-166520',
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
})

app.use(express.static(__dirname))

app.get('/', (req, res, next) => {
    res.sendfile('index.html')
})

app.get('/language', (req, res, next) => {
	const text = 'Hello, world!';
	const content = language.document({ content: text })

	content.detectSentiment(text)
  	.then((results) => {
    const sentiment = results[0];

    console.log(`Text: ${text}`);
    console.log(`Sentiment score: ${sentiment.score}`);
    console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
  })
  .then(() => res.send('hello'))
  .catch((err) => {
    console.error('ERROR:', err);
  });
})


app.listen(3000, function() {
    console.log("LISTENING ON PORT 3000")
})

