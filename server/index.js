const express = require('express')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL, err => {
  err && console.log(err)
})

const app = express()
const bodyParser = require('body-parser')

app.use('/uploads', express.static(require('path').normalize(__dirname + '/..') + '/uploads'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('cors')())

const passport = require('passport')
app.use(passport.initialize())
passport.use('simple-password-sessionless', require('./app/simple-password-sessionless.strategy.js')())

const authMiddleware = require('./app/auth-middleware')
const UserController = require('./app/user.controller.js')

// no rest, no routers because of simplicity of the app
app.get('/api/get-info', authMiddleware, UserController.getInfo)
app.post('/api/register', UserController.register)
app.put('/api/update', authMiddleware, UserController.update)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Application started on port', port)
})

module.exports = app
