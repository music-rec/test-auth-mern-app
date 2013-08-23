const User = require('./user.model.js')
const fs = require('fs')
const request = require('request')

const cb = res => (err, user) => {
  if ( err ) {
    res.status(500).send(err)
  } else {
    user.password = undefined
    res.send(user)
  }
}

exports.getInfo = (req, res) => res.send(req.user)

const getHash = require('sha1')
const rootPath = require('path').normalize(__dirname + '/../..')
exports.register = function (req, res) {
  const { username, password = '' } = req.body
  User.findOne({ username }, (err, user) => {
    if ( err ) {
      res.status(500).send(err)
    } else if ( user ) {
      res.status(500).send('User with this username already exist')
    } else {
      const url = 'http://lorempixel.com/g/50/50/'
      const image = Date.now()
      const writeStream = fs.createWriteStream(rootPath + `/uploads/${image}.png`)
      request(url).pipe(writeStream).on('close', () => {
        new User({
          username,
          password: getHash(password),
          image
        }).save(cb(res))
      }).on('error', e=>{
        console.log(e)
      })
    }
  })
}

exports.update = function (req, res) {
  User.findOneAndUpdate({ _id: req.user._id }, req.body, cb(res))
}
