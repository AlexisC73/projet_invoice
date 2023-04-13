import { TokenService } from '../../token-service'
import { UserRepository } from '../../user.repository'

export class ConnectGoogleUserUsecase {
  constructor(private readonly userRepository: UserRepository, private readonly tokenService: TokenService) {}

  async handle(command: ConnectGoogleUserCommand): Promise<string> {
    const user = await this.userRepository.findOneByGoogleId(command.googleId)
    if (!user) {
      throw new Error("User don't exist")
    }
    const token = this.tokenService.createConnectToken({ id: user.id, role: user.role })
    return token
  }
}

export interface ConnectGoogleUserCommand {
  googleId: string
}
