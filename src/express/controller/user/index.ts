import * as userModel from '../../model/user'
import { createMongoUser } from '../../../utils'
import * as jwt from 'jsonwebtoken'

export const googleAuth = async (req, res) => {
  try {
    const { id: googleId, photos } = req.user
    let fundUser = await userModel.findUserByGoogleId(googleId)
    if (!fundUser) {
      const mongoUser = await createMongoUser(googleId, photos[0].value)
      fundUser = await userModel.saveMongoUser(mongoUser)
    }
    const token = jwt.sign({ googleId: fundUser.googleId, role: fundUser.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })
    res.cookie('token', token, { httpOnly: true })
    const redirectLink =
      process.env.NODE_ENV === 'production' ? 'https://invoice.alexis-comte.com' : 'http://localhost:3000'
    res.redirect(redirectLink + '/login/?connected=true')
  } catch (error) {
    throw error
  }
}

export const getMe = async (req, res) => {
  try {
    const { googleId } = req.user
    const fundUser = await userModel.findUserByGoogleId(googleId)
    res.status(200).json({ googleId: fundUser.googleId, role: fundUser.role, photo: req.user.photos[0].value })
  } catch (error) {
    throw error
  }
}
