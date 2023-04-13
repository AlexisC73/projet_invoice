import { Repository } from 'typeorm'
import { UserRepository } from '../application/user.repository'
import { User } from '../domain/user'
import { MongoUser } from '../entity/User'
import { userToMongoUser } from './utils'
import { ObjectId } from 'mongodb'

export class MongoUserRepository implements UserRepository {
  constructor(private readonly typeOrmRepository: Repository<MongoUser>) {}

  async save(user: User): Promise<void> {
    const newUser = userToMongoUser(user)

    await this.typeOrmRepository.save(newUser)
    return Promise.resolve()
  }
  async findOneByGoogleId(googleId: string): Promise<User> {
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
  async findOneById(id: string): Promise<User> {
    const user = await this.typeOrmRepository.findOneBy({ _id: new ObjectId(id) as any })
    if (!user) {
      return null
    }
    return User.fromData({ ...user, id: user._id.toString() })
  }
}
