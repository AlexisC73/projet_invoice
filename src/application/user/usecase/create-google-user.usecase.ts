import { User } from '../../../domain/user'
import { UserRepository } from '../../user.repository'

export class CreateGoogleUserUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(command: CreateGoogleUserCommand): Promise<void> {
    const user = User.fromGoogle(command.id, command.googleId)
    await this.userRepository.save(user)
    return Promise.resolve()
  }
}

export interface CreateGoogleUserCommand {
  id: string
  googleId: string
}
