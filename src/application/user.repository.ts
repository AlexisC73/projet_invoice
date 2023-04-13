import { User } from '../domain/user'

export interface UserRepository {
  save(user: User): Promise<void>
  findOneByGoogleId(googleId: string): Promise<User | null>
  findOneById(id: string): Promise<User>
}
