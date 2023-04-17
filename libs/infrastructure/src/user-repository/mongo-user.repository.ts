import { Repository } from 'typeorm'
import { UserRepository } from '@invoice/domain/dist/user/user.repository'
import { User } from '@invoice/domain/dist/user'
import { TypeormMongoUser } from '../mongo/entity/User'
import { ObjectId } from 'mongodb'
import "reflect-metadata"

export class MongoUserRepository implements UserRepository {
  constructor(
    private readonly typeOrmRepository: Repository<TypeormMongoUser>
  ) {}

  async save(user: User): Promise<void> {
    const newUser = TypeormMongoUser.fromDomainUser(user)

    await this.typeOrmRepository.save(newUser)
    return Promise.resolve()
  }
  async findOneByGoogleId(googleId: string): Promise<User | null> {
    const user = await this.typeOrmRepository.findOne({
      where: {
        linkedAccounts: {
          google: { id: googleId },
        },
      },
    })
    if (!user) {
      return null
    }
    return User.fromData({ ...user, id: user._id.toString() })
  }
  async findOneById(id: string): Promise<User | null> {
    const user = await this.typeOrmRepository.findOneBy({
      _id: new ObjectId(id) as any,
    })
    if (!user) {
      return null
    }
    return User.fromData({ ...user, id: user._id.toString() })
  }
}
