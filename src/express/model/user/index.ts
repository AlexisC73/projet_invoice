import { ObjectId } from 'mongodb'
import { AppDataSource } from '../../../data-source'
import { MongoUser } from '../../../entity/User'

const userRepo = AppDataSource.getRepository(MongoUser)

export const findUserByGoogleId = async (googleId: string) => {
  try {
    return await userRepo.findOne({ where: { googleId } })
  } catch (error) {
    throw error
  }
}

export const saveMongoUser = (user: MongoUser) => {
  try {
    return userRepo.save(user)
  } catch (error) {
    throw error
  }
}
