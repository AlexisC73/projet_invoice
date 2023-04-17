import { User } from '.'

export interface UserRepository {
  save(user: User): Promise<void>
  findOneByGoogleId(googleId: string): Promise<User | null>
  findOneById(id: string): Promise<User | null>
}
