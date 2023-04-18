import { User } from '..'
import { IdGenerator } from '../../id/id.generator'
import { UserRepository } from '../user.repository'

export class CreateGoogleUserUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly idGenerator: IdGenerator
  ) {}

  async handle(command: CreateGoogleUserCommand): Promise<void> {
    const user = User.fromGoogle(
      this.idGenerator.generate(command.id),
      command.googleId,
      100,
      command.email
    )
    await this.userRepository.save(user)
    return Promise.resolve()
  }
}

export interface CreateGoogleUserCommand {
  id?: string
  googleId: string
  email: string
}
