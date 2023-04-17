import { PrismaClient } from '@invoice/domain'
import { exec } from 'child_process'
import { promisify } from 'util'
import { PrismaUserRepository } from '../prisma-user.repository'
import { usecases } from '@invoice/domain'
import { ObjectId } from 'mongodb'
import { userBuilder } from '@invoice/domain/src/user/tests/userBuilder'
import * as dotenv from 'dotenv'

const asyncExec = promisify(exec)

describe('prisma user repo', () => {
  let prismaClient: PrismaClient

  beforeAll(async () => {
    dotenv.config()

    prismaClient = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    })

    await asyncExec(
      `set DATABASE_URL=${process.env.DATABASE_URL} && npx prisma generate --schema=../domain/prisma/schema.prisma`
    )
    return prismaClient.$connect()
  }, 10000)

  beforeEach(async () => {
    await prismaClient.user.deleteMany()
    await prismaClient.invoice.deleteMany()
  })

  afterAll(async () => {
    await prismaClient.user.deleteMany()
    await prismaClient.invoice.deleteMany()
    await prismaClient.$disconnect()
  })

  test('should add a user', async () => {
    const userRepository = new PrismaUserRepository(prismaClient)
    const createGoogleUserUsecase = new usecases.CreateGoogleUserUsecase(
      userRepository
    )

    const userId = new ObjectId().toString() as any
    const savedUser = userBuilder()
      .withId(userId)
      .withLinkedAccounts({ google: { id: 'google-id' } })
      .buildGoogleUser()

    await createGoogleUserUsecase.handle({
      email: savedUser.data.email,
      googleId: savedUser.data.linkedAccounts.google.id,
      id: savedUser.data.id,
    })

    const inDbUser = await userRepository.findOneById(userId)
    expect(inDbUser?.data).toEqual(savedUser.data)
  })
})
