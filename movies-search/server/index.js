require('dotenv').config()
const path = require('path')
const express = require('express')
const bodyparser = require('body-parser')
const app = require('express')()
const http = require('http').Server(app)
const router = require('./router')
const cors = require('cors')

app.use(cors())
app.use(bodyparser.json({type: '*/*'}))

const CLIENT_BUILD_PATH = path.join(__dirname, '../../client/build')

router(app)
if (process.env.NODE_ENV === 'production') {
  // if you build the app in the prod serve it. in the dev, the webpack dev serves it
  app.use(express.static(CLIENT_BUILD_PATH))
  app.get('*', function(req, res) {
    // get all request. this is if you have router on the front
    res.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'))
  })
}

const port = process.env.PORT || 5001
http.listen(port)

console.log('Server listening on:', port)
