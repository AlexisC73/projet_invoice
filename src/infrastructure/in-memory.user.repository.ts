import { UserRepository } from '../application/user.repository'
import { User } from '../domain/user'

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = []

  save(user: User): Promise<void> {
    if (this.users.find(u => u.id === user.id)) {
      this.users = this.users.map(u => (u.id === user.id ? user : u))
      return Promise.resolve()
    }
    this.users.push(user)
    return Promise.resolve()
  }

  async findOneByGoogleId(googleId: string): Promise<User> {
    const user = this.users.find(u => u.linkedAccounts.google.id === googleId)
    return user
  }

  findOneById(id: string): User {
    return this.users.find(u => u.id === id)
  }

  setUser(user: User[]): void {
    if (Array.isArray(user)) {
      this.users = user
      return
    }
  }
}
