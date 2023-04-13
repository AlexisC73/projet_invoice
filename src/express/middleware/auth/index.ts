import { JWTTokenService } from '../../../infrastructure/jwt-token-service'

export const isLoggedIn = async (req, res, next) => {
  const tokenService = new JWTTokenService(process.env.JWT_SECRET)

  try {
    if (!req.cookies.token || !req.user || !req.user.id) {
      throw new Error("You're not logged in")
    }
    const token = req.cookies.token
    const decoded = tokenService.verifyConnectToken(token)
    req.currentUser = decoded
    req.token = req.cookies.token
    next()
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
}
