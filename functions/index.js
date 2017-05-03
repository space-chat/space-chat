var functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const Translate = require('@google-cloud/translate');

// Your Google Cloud Platform project ID
const projectId = 'YOUR_PROJECT_ID';

// Instantiates a client
const translateClient = Translate();

// The text to translate
const text = 'Hello, world!';
// The target language
const target = 'es';

exports.helloWorld = functions.database.ref("/messages/{pushKey}/text").onWrite(event => {
    const original = event.data.val();
    return translateClient.translate(original, target)
        .then((results) => {
            const translation = results[0];

            console.log(`Text: ${original}`);
            console.log(`Translation: ${translation}`);
            return event.data.ref.parent.parent.push({originalMessageKey: event.params.pushKey, translation})
        })
        .catch((err) => {
            console.error('ERROR:', err);
        });
});

// Imports the Google Cloud client library


// Translates some text into Russian