// const router = require('express').Router()
// var indico = require('indico.io');
// indico.apiKey = require('./indicokey').api_key

// module.exports = router;

// var response = function (res) { console.log(res); }  //logs a response
// var logError = function (err) { console.log(err); } //logs an error

//This was originally going to be a route that would be hit from server.js. 
//But I kept getting errors. It does not like axios + socketio together. 

// router.post('/', (req, res, next) => {
//   console.log("IM THE ROUTE HIH HIHI")
//   indico.analyzeText([req.body.text], { apis: ["personality", "sentiment", "emotion"] })
//     .then(data => {
//       console.log(req.body, "BODYYYY")
//       res.send(data)
//     })
//     .catch(logError)
// })

/*
==personality --> openness, extraversion, agreeableness, conscientiousness
==sentiment analysis --a # between 0 and 1
==sentimentHQ --> less performant but high quality sentiment analysis
==personas --> all 16 Myers-Briggs personality types
==emotion --> anger, joy, fear, sadnses, surprise
==intersections--> lets you query multiple indico apis and the result is an intersection of the two results
==analyzeText --> lets you query multiple indico apis and the result is a batch of results from each different api
*/

// // single example
// indico.sentiment("I love writing code!")
//   .then(response)
//   .catch(logError);

// // batch example
// var batchInput = [
//     "I love writing code!",
//     "Alexander and the Terrible, Horrible, No Good, Very Bad Day"
// ];
// indico.sentiment(batchInput)
//   .then(response)
//   .catch(logError);