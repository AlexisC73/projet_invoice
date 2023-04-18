import { IdGenerator } from '@invoice/domain'
import { ObjectId } from 'mongodb'

export class MongoIdGenerator implements IdGenerator {
  generate(id?: string): string {
    if (!id) return new ObjectId().toString()
    return new ObjectId(id).toString()
  }
}
