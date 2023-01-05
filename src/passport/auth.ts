import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import * as passport from 'passport'

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.NODE_ENV === 'production'
          ? 'https://alexis-comte.com/user/auth/google/callback'
          : 'http://localhost:5500/user/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile)
    }
  )
)

passport.serializeUser(function (user: Express.User, cb) {
  process.nextTick(function () {
    return cb(null, {
      ...user,
    })
  })
})

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user)
  })
})
