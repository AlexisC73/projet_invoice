import * as jwt from 'jsonwebtoken'
import { findUserByGoogleId } from '../../model/user'
import { mongoUserToUser } from '../../../utils'

export const isLoggedIn = async (req, res, next) => {
  try {
    if (!req.cookies.token || !req.user || !req.user.id) {
      throw new Error("You're not logged in")
    }
    const token = req.cookies.token
    const { id } = req.user
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err || decoded.googleId !== id) {
        throw new Error("You're not logged in")
      }
      const user = mongoUserToUser(await findUserByGoogleId(id))
      req.user = { ...req.user, ...user }
      next()
    })
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
}
