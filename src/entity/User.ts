import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm'
import { ROLE } from '../utils'

@Entity()
export class MongoUser implements Omit<User, 'id'> {
  @ObjectIdColumn()
  _id: ObjectID

  @Column()
  googleId: string

  @Column()
  role: number

  @Column()
  createdAt: string

  @Column()
  updatedAt: string

  isModerator(): boolean {
    return this.role >= ROLE.MODERATOR
  }

  isAdmin(): boolean {
    return this.role >= ROLE.ADMIN
  }
}
