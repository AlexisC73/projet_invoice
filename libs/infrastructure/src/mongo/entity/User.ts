import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm'
import { User } from '@invoice/domain/dist/user'
import { ObjectId } from 'mongodb'

@Entity()
export class TypeormMongoUser implements Omit<User['data'], 'id'> {
  @ObjectIdColumn()
  _id: ObjectID

  @Column({ nullable: false })
  email: string

  @Column({ nullable: true })
  password: string | null

  @Column({ default: {} })
  linkedAccounts: User['data']['linkedAccounts']

  @Column({ default: 100 })
  role: number

  toDomainUser(): User {
    return User.fromData({
      id: this._id.toString(),
      email: this.email,
      password: this.password,
      linkedAccounts: this.linkedAccounts,
      role: this.role,
    })
  }

  static fromDomainUser(user: User): TypeormMongoUser {
    const mongoUser = new TypeormMongoUser()
    mongoUser._id = new ObjectId(user.id) as any
    mongoUser.email = user.email
    mongoUser.password = user.password
    mongoUser.linkedAccounts = user.linkedAccounts
    mongoUser.role = user.role
    return mongoUser
  }
}
