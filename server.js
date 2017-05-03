const express = require('express')
const app = express()

app.use(express.static(__dirname))

app.get('/', (req, res, next) => {
    res.sendfile('index.html')
})

app.listen(3000, function() {
    console.log("LISTENING ON PORT 300")
})