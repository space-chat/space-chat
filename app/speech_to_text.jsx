import io from './sockets' //dis be socket.io's client side plugin. 

const record = require('node-record-lpcm16');

// Imports the Google Cloud client library
const Speech = require('@google-cloud/speech');

// Instantiates a client
const speech = Speech();

// The encoding of the audio file, e.g. 'LINEAR16'
const encoding = 'LINEAR16';

// The sample rate of the audio file in hertz, e.g. 16000
const sampleRateHertz = 16000;

// The BCP-47 language code to use, e.g. 'en-US'
const languageCode = 'en-US';

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode
  },
  interimResults: false // If you want interim results, set this to true
};

// Create a recognize stream
const recognizeStream = speech.createRecognizeStream(request)
  .on('error', console.error)
  .on('data', (data) => {
    console.log(data.results)
    socket.emit('Transcription', data.results)
  });

// Start recording and send the microphone input to the Speech API
export default function listenForSpeech () {
  record
    .start({
      sampleRateHertz: sampleRateHertz,
      threshold: 0,
      // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
      verbose: false,
      recordProgram: 'rec', // Try also "arecord" or "sox"
      silence: '2.0'
    })
    .on('error', console.error)
    .pipe(recognizeStream);
}

console.log('Listening, press Ctrl+C to stop.');


