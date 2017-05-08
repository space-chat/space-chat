const bodyParser = require('body-parser')
const express = require('express')

express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(express.static('public'))
  .get ('/', (req, res, next) => res.sendStatus(200))
  .listen(process.env.PORT || 9999)


