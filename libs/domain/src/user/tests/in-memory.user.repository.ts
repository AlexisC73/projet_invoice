import { User } from '..'
import { UserRepository } from '../user.repository'

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = []

  save(user: User): Promise<void> {
    if (this.users.find((u) => u.id === user.id)) {
      this.users = this.users.map((u) => (u.id === user.id ? user : u))
      return Promise.resolve()
    }
    this.users.push(user)
    return Promise.resolve()
  }

  async findOneByGoogleId(googleId: string): Promise<User | null> {
    return (
      this.users.find((u) => u.linkedAccounts.google.id === googleId) ?? null
    )
  }

  async findOneById(id: string): Promise<User | null> {
    return this.users.find((u) => u.id === id) ?? null
  }

  setUser(user: User[]): void {
    if (Array.isArray(user)) {
      this.users = user
      return
    }
  }
}
