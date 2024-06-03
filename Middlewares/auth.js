const passport = require('passport')
const httpStatus = require('http-status')
const AppError = require('../Utils/AppError')

const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
  if (err || info || !user) {
    const message =
      info && info.name === 'TokenExpiredError'
        ? 'Your token is expired, please use refresh token to renew it, or authenticate again!'
        : 'Please authenticate in order to consume this resource!'

    return reject(new AppError(httpStatus.UNAUTHORIZED, message))
  }

  req.user = user
  return resolve()
}

const auth = () => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject))(req, res, next)
  }).then(()=>{
    console.log('succeed')
  })
    .catch((err) => next(err))
}

module.exports = auth
