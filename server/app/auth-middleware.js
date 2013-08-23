const passport = require('passport')

const simpleAuth = passport.authenticate('simple-password-sessionless', { session: false })

module.exports = (req, res, next) => {
  simpleAuth(req, res, () => {
    if ( req.user ) {
      req.user.password = undefined
      next()
    } else {
      res.sendStatus(401)
    }
  })
}
