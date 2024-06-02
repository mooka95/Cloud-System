const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const config = require('../Config')

const jwtOptions = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromExtractors([
      ExtractJwt.fromHeader('Authorization'),
      ExtractJwt.fromAuthHeaderAsBearerToken(),
    ]),
  }

  const jwtVerify = async (payload, done) => {
    try {
      if (payload.user) {
        done(null, payload.user)
      }
  
      done(null, false)
    } catch (error) {
      done(error, false)
    }
  }
  const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify)
  module.exports = {
    jwtStrategy,
  }