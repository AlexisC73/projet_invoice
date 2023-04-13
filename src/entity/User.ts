import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm'
import { User } from '../domain/user'

@Entity()
export class MongoUser implements Omit<User['data'], 'id'> {
  @ObjectIdColumn()
  _id: ObjectID

  @Column({ nullable: true })
  email: string

  @Column({ nullable: true })
  password: string

  @Column({ default: {} })
  linkedAccounts: User['data']['linkedAccounts']

  @Column({ default: 100 })
  role: number

  @Column()
  googleId: string
}
