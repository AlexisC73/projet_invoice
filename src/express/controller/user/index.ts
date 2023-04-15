import { ConnectGoogleUserUsecase } from '../../../application/user/usecase/connect-google-user.usecase'
import { MongoUserRepository } from '../../../infrastructure/mongo-user.repository'
import { MongoUser } from '../../../entity/User'
import { AppDataSource } from '../../../data-source'
import { JWTTokenService } from '../../../infrastructure/jwt-token-service'
import { CreateGoogleUserUsecase } from '../../../application/user/usecase/create-google-user.usecase'
import { ObjectId } from 'mongodb'
import { User } from '../../../domain/user'
import { AuthError, NotFoundError } from '../../../application/errors'

export const googleAuth = async (req, res) => {
  const typeormUserRepository = AppDataSource.getRepository(MongoUser)
  const userRepository = new MongoUserRepository(typeormUserRepository)
  const jwtTokenService = new JWTTokenService(process.env.JWT_SECRET)
  const createGoogleUser = new CreateGoogleUserUsecase(userRepository)
  const connectGoogleUserUsecase = new ConnectGoogleUserUsecase(userRepository, jwtTokenService)

  try {
    const { id: googleId } = req.user
    const email = req.user.emails.filter(email => email.verified)[0].value
    let existUser = await userRepository.findOneByGoogleId(googleId)

    if (!existUser) {
      await createGoogleUser.handle({
        googleId,
        id: new ObjectId().toString() as any,
        email,
      })
    }

    existUser = await userRepository.findOneByGoogleId(googleId)
    if (existUser.IsBanned) {
      throw new AuthError("You're banned")
    }
    const token = await connectGoogleUserUsecase.handle({ googleId })
    await res.cookie('token', token, { httpOnly: true })
    const redirectLink =
      process.env.NODE_ENV === 'production' ? 'https://invoice.alexis-comte.com' : 'http://localhost:3000'
    res.redirect(redirectLink + '/login/?connected=true')
  } catch (error) {
    const redirectLink =
      process.env.NODE_ENV === 'production' ? 'https://invoice.alexis-comte.com' : 'http://localhost:3000'
    res.redirect(redirectLink + '/login/?connected=false&error=' + error.message)
  }
}

export const getMe = async (req, res) => {
  try {
    if (!req.currentUser) {
      throw new NotFoundError("You're not logged in")
    }
    const { id } = req.currentUser as User['data']
    res.status(200).json({ id })
  } catch (error) {
    throw error
  }
}
