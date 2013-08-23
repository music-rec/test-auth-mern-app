const CustomStrategy = require('passport-custom')
const User = require('./user.model.js')

const getHash = require('sha1')

module.exports = () => new CustomStrategy((req, cb) => {
  const username = req.get('username')
  const password = req.get('password')

  return User.findOne({ username }, (err, user) => {
    if ( !err && user && user.password === getHash(password) ) {
      cb(null, user)
    } else {
      cb(err, null)
    }
  })
})
