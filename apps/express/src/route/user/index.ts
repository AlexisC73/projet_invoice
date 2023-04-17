import { Router } from 'express'
import * as userController from '../../controller/user'
import passport = require('passport')
import { isLoggedIn } from '../../middleware/auth'
require('../../passport/auth')

const router = Router()

router.get('/me', isLoggedIn, userController.getMe)

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureMessage: 'Failed to authenticate' }),
  userController.googleAuth
)

router.get('/logout', (req, res) => {
  req.session.destroy(() => console.log('Session destroyed'))
  res.send("You're logged out")
})

export default router
