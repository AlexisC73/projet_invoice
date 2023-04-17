import { User } from '../user'
import { InMemoryUserRepository } from '../../../infrastructure/in-memory.user.repository'
import { JWTTokenService } from '../../../infrastructure/jwt-token-service'
import { ConnectGoogleUserUsecase } from '../usecases/connect-google-user.usecase'
import { Token } from '../../token/token'
import { CreateGoogleUserCommand, CreateGoogleUserUsecase } from '../usecases/create-google-user.usecase'

export const createUserFixture = () => {
  const userRepository = new InMemoryUserRepository()
  const tokenService = new JWTTokenService('secret-key')
  const createGoogleUserUsecase = new CreateGoogleUserUsecase(userRepository)
  const connectGoogleUserUsecase = new ConnectGoogleUserUsecase(userRepository, tokenService)

  let connectToken

  let thrownError: Error

  return {
    givenUserExist: (user: User[]) => {
      userRepository.setUser(user)
    },
    givenUserIsLoggedIn: ({ id, role }: { id: string; role: number }) => {
      connectToken = tokenService.createConnectToken({ id, role })
    },
    whenUserSignupWithGoogle: async (params: CreateGoogleUserCommand) => {
      try {
        await createGoogleUserUsecase.handle({
          id: 'test-id',
          googleId: params.googleId,
          email: params.email,
        })
      } catch (err: any) {
        thrownError = err
      }
    },
    whenUserConnectWithGoogle: async (params: { googleId: string }) => {
      try {
        connectToken = await connectGoogleUserUsecase.handle({
          googleId: params.googleId,
        })
      } catch (err: any) {
        thrownError = err
      }
    },
    thenUserShouldBe: async (expected: User) => {
      expect((await userRepository.findOneById(expected.id)).data).toEqual(expected.data)
    },
    thenConnectedTokenShouldBe: (expected: Token) => {
      expect(tokenService.decode(connectToken)).toEqual(expect.objectContaining(expected))
    },
    getToken: () => connectToken,
    getUserRepository: () => userRepository,
    getInvoiceRepository: () => userRepository,
  }
}

export type UserFixture = ReturnType<typeof createUserFixture>