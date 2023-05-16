import { ConnectGoogleUserUsecase } from '@invoice/domain/dist/user/usecases/connect-google-user.usecase'
import { CreateGoogleUserUsecase } from '@invoice/domain/dist/user/usecases/create-google-user.usecase'
import { idGenerator, tokenService, userRepository } from '../../config'
import { AuthError, NotFoundError } from '@invoice/domain/dist/errors'
import { User } from '@invoice/domain/dist/user'

export const googleAuth = async (req, res) => {
  const connectGoogleUserUsecase = new ConnectGoogleUserUsecase(userRepository, tokenService)
  const createGoogleUserUsecase = new CreateGoogleUserUsecase(userRepository, idGenerator)

  try {
    const { id: googleId } = req.user
    const email = req.user.emails.filter(email => email.verified)[0].value

    let existUser = await userRepository.findOneByGoogleId(googleId)

    if (!existUser) {
      await createGoogleUserUsecase.handle({
        googleId,
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
    console.dir(error)
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
    res.status(401).json({ error: error.message })
  }
}
