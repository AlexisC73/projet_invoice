import { AuthError, NotFoundError } from '@invoice/domain/dist/errors'
import { tokenService, userRepository } from '../../config'

export const isLoggedIn = async (req, res, next) => {
  try {
    if (!req.cookies.token || !req.user || !req.user.id) {
      throw new NotFoundError("You're not logged in")
    }
    const token = req.cookies.token
    const decoded = tokenService.verifyConnectToken(token)
    const user = await userRepository.findOneById(decoded.id)
    if (!user) {
      throw new NotFoundError("You're not logged in")
    }
    if (user.IsBanned) {
      throw new AuthError("You're banned")
    }
    req.currentUser = decoded
    req.token = req.cookies.token
    next()
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
}
