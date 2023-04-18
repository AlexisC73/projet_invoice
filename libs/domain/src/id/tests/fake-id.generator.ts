import { IdGenerator } from '../id.generator'

export class FakeIdGenerator implements IdGenerator {
  generate(id?: string): string {
    if (!id) return 'fake-id'
    return id
  }
}
