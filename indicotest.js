var indico = require('indico.io');
indico.apiKey =  'b895b4cf93b2701d2b26c5e918f141e2';

var response = function(res) { console.log(res); }
var logError = function(err) { console.log(err); }

// single example
indico.sentiment("I love writing code!")
  .then(response)
  .catch(logError);

// batch example
var batchInput = [
    "I love writing code!",
    "Alexander and the Terrible, Horrible, No Good, Very Bad Day"
];
indico.sentiment(batchInput)
  .then(response)
  .catch(logError);