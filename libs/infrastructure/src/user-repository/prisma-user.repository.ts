import { LinkedAccounts, User } from '@invoice/domain/dist/user'
import { UserRepository } from '@invoice/domain/dist/user/user.repository'
import { PrismaClient } from '@invoice/domain'

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(user: User): Promise<void> {
    const existUser = await this.prisma.user.findUnique({
      where: { id: user.id },
    })
    if (existUser) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { ...user.data },
      })
    }
    await this.prisma.user.create({
      data: {
        email: user.email,
        id: user.id,
        linkedAccounts: user.linkedAccounts,
        password: user.password,
        role: user.role,
      },
    })
  }
  async findOneByGoogleId(googleId: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { linkedAccounts: { equals: { google: { id: googleId } } } },
    })
    if (!user) return null

    const linkedAccounts = user.linkedAccounts as LinkedAccounts
    return User.fromData({
      email: user.email,
      id: user.id,
      linkedAccounts,
      password: user.password,
      role: user.role,
    })
  }
  async findOneById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) return null

    const linkedAccounts = user.linkedAccounts as LinkedAccounts
    return User.fromData({
      email: user.email,
      id: user.id,
      linkedAccounts,
      password: user.password,
      role: user.role,
    })
  }
}
