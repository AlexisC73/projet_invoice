import { User } from '../../../../domain/user'
import { InMemoryUserRepository } from '../../../../infrastructure/in-memory.user.repository'
import { JWTTokenService } from '../../../../infrastructure/jwt-token-service'
import { Token } from '../../../token-service'
import { ConnectGoogleUserUsecase } from '../connect-google-user.usecase'
import { CreateGoogleUserUsecase } from '../create-google-user.usecase'

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
    givenUserIsLoggedIn: (id: string) => {
      connectToken = tokenService.createConnectToken({ id })
    },
    whenUserSignupWithGoogle: async (params: { id: string; googleId: string }) => {
      try {
        await createGoogleUserUsecase.handle({
          id: 'test-id',
          googleId: params.googleId,
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
    thenUserShouldBe: (expected: User) => {
      expect(userRepository.findOneById(expected.id).data).toEqual(expected.data)
    },
    thenConnectedTokenShouldBe: (expected: Token) => {
      expect(tokenService.decode(connectToken)).toEqual(expect.objectContaining(expected))
    },
    getToken: () => connectToken,
  }
}

export type UserFixture = ReturnType<typeof createUserFixture>
