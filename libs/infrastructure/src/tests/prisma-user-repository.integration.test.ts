import { PrismaClient, User, UserUsecase, userBuilder } from '@invoice/domain'
import { exec } from 'child_process'
import { promisify } from 'util'
import { PrismaUserRepository } from '../user-repository/prisma-user.repository'
import { ObjectId } from 'mongodb'
import { JWTTokenService } from '../token-service/jwt/jwt-token-service'
import * as dotenv from 'dotenv'
import { MongoIdGenerator } from '../id-generator/mongo-id.generator'

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

    const command =
      process.env.REPOSITORY === 'gitlab'
        ? `DATABASE_URL=${process.env.DATABASE_URL} && npx prisma generate --schema=../domain/prisma/schema.prisma`
        : `set DATABASE_URL=${process.env.DATABASE_URL} && npx prisma generate --schema=../domain/prisma/schema.prisma`

    await asyncExec(command)
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
    const idGenerator = new MongoIdGenerator()
    const createGoogleUserUsecase = new UserUsecase.CreateGoogleUserUsecase(
      userRepository,
      idGenerator
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

  test('should connect a user', async () => {
    const userRepository = new PrismaUserRepository(prismaClient)
    const tokenService = new JWTTokenService('secret')
    const connectGoogleUserUsecase = new UserUsecase.ConnectGoogleUserUsecase(
      userRepository,
      tokenService
    )

    const userId = new ObjectId().toString() as any
    const savedUser = userBuilder()
      .withId(userId)
      .withLinkedAccounts({ google: { id: 'google-id' } })
      .buildGoogleUser()

    await userRepository.save(User.fromData(savedUser.data))

    const token = await connectGoogleUserUsecase.handle({
      googleId: savedUser.data.linkedAccounts.google.id,
    })

    const decodedToken = tokenService.decode(token)
    expect(decodedToken?.id).toEqual(userId)

    const inDbUser = await userRepository.findOneById(userId)
    expect(inDbUser?.data).toEqual(savedUser.data)
  })
})
