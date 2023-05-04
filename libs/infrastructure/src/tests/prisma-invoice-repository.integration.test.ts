import {
  InvoiceUsecase,
  PrismaClient,
  ROLE,
  User,
  invoiceBuilder,
  userBuilder,
} from '@invoice/domain'
import { exec } from 'child_process'
import { promisify } from 'util'
import { PrismaUserRepository } from '../user-repository/prisma-user.repository'
import { PrismaInvoiceRepository } from '../invoice-repository/prisma.invoice.repository'
import { MongoIdGenerator } from '../id-generator/mongo-id.generator'
import { ObjectId } from 'mongodb'
import { JWTTokenService } from '../token-service/jwt/jwt-token-service'
import * as dotenv from 'dotenv'

const asyncExec = promisify(exec)

describe('prisma user repo', () => {
  let prismaClient: PrismaClient

  beforeAll(async () => {
    if (process.env.REPOSITORY !== 'gitlab') {
      dotenv.config()
    }

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

  test('should add invoice for a user', async () => {
    const userRepository = new PrismaUserRepository(prismaClient)
    const invoiceRepository = new PrismaInvoiceRepository(prismaClient)
    const mongoIdGenerator = new MongoIdGenerator()
    const tokenService = new JWTTokenService('secret')
    const postInvoiceUsecase = new InvoiceUsecase.PostInvoiceUsecase(
      invoiceRepository,
      tokenService,
      mongoIdGenerator
    )

    const userId = new ObjectId().toString() as any
    const savedUser = userBuilder()
      .withId(userId)
      .withRole(100)
      .withLinkedAccounts({ google: { id: 'google-id' } })
      .buildGoogleUser()
    await userRepository.save(User.fromData(savedUser.data))

    const token = tokenService.createConnectToken({
      id: userId,
      role: 100,
    })

    const invoiceId = new ObjectId().toString()
    const invoiceToSave = invoiceBuilder()
      .withId(invoiceId)
      .withOwner(userId)
      .build()

    await postInvoiceUsecase.handle(invoiceToSave, token)

    const inDbInvoice = await invoiceRepository.findById(invoiceId)
    expect(inDbInvoice?.data).toEqual(invoiceToSave.data)
  })

  test('should update invoice of a user', async () => {
    const userRepository = new PrismaUserRepository(prismaClient)
    const invoiceRepository = new PrismaInvoiceRepository(prismaClient)
    const tokenService = new JWTTokenService('secret')
    const updateInvoiceUsecase = new InvoiceUsecase.UpdateInvoiceUsecase(
      invoiceRepository,
      userRepository,
      tokenService
    )

    const userId = new ObjectId().toString() as any
    const savedUser = userBuilder()
      .withId(userId)
      .withRole(100)
      .withLinkedAccounts({ google: { id: 'google-id' } })
      .buildGoogleUser()
    await userRepository.save(User.fromData(savedUser.data))

    const token = tokenService.createConnectToken({
      id: userId,
      role: 100,
    })

    const invoiceId = new ObjectId().toString()
    const currentInvoice = invoiceBuilder()
      .withId(invoiceId)
      .withOwner(userId)
      .withDescription('old description')
      .build()
    await invoiceRepository.save(currentInvoice)

    await updateInvoiceUsecase.handle({
      invoiceToUpdate: {
        id: invoiceId,
        description: 'description (updated)',
      },
      token,
    })

    const inDbInvoice = await invoiceRepository.findById(invoiceId)
    expect(inDbInvoice?.data).toEqual({
      ...currentInvoice.data,
      description: 'description (updated)',
    })
  })

  test('should update invoice status of a user', async () => {
    const userRepository = new PrismaUserRepository(prismaClient)
    const invoiceRepository = new PrismaInvoiceRepository(prismaClient)
    const tokenService = new JWTTokenService('secret')
    const updateInvoiceStatusUsecase =
      new InvoiceUsecase.UpdateInvoiceStatusUsecase(
        invoiceRepository,
        userRepository,
        tokenService
      )

    const userId = new ObjectId().toString() as any
    const savedUser = userBuilder()
      .withId(userId)
      .withRole(100)
      .withLinkedAccounts({ google: { id: 'google-id' } })
      .buildGoogleUser()
    await userRepository.save(User.fromData(savedUser.data))

    const token = tokenService.createConnectToken({
      id: userId,
      role: 100,
    })

    const invoiceId = new ObjectId().toString()
    const currentInvoice = invoiceBuilder()
      .withId(invoiceId)
      .withOwner(userId)
      .withStatus('pending')
      .build()
    await invoiceRepository.save(currentInvoice)

    await updateInvoiceStatusUsecase.handle({
      invoiceToUpdate: {
        id: invoiceId,
        status: 'paid',
      },
      token,
    })

    const inDbInvoice = await invoiceRepository.findById(invoiceId)
    expect(inDbInvoice?.data).toEqual({
      ...currentInvoice.data,
      status: 'paid',
    })
  })

  test('should delete invoice of a user', async () => {
    const userRepository = new PrismaUserRepository(prismaClient)
    const invoiceRepository = new PrismaInvoiceRepository(prismaClient)
    const tokenService = new JWTTokenService('secret')
    const deleteInvoiceUsecase = new InvoiceUsecase.DeleteInvoiceUsecase(
      invoiceRepository,
      userRepository,
      tokenService
    )

    const userId = new ObjectId().toString() as any
    const savedUser = userBuilder()
      .withId(userId)
      .withRole(100)
      .withLinkedAccounts({ google: { id: 'google-id' } })
      .buildGoogleUser()
    await userRepository.save(User.fromData(savedUser.data))

    const token = tokenService.createConnectToken({
      id: userId,
      role: 100,
    })

    const invoiceId = new ObjectId().toString()
    const currentInvoice = invoiceBuilder()
      .withId(invoiceId)
      .withOwner(userId)
      .withStatus('pending')
      .build()
    await invoiceRepository.save(currentInvoice)

    await deleteInvoiceUsecase.handle({
      id: invoiceId,
      token,
    })

    const inDbInvoice = await invoiceRepository.getAll()
    expect(inDbInvoice.length).toEqual(0)
  })

  test('should return all invoices', async () => {
    const userRepository = new PrismaUserRepository(prismaClient)
    const invoiceRepository = new PrismaInvoiceRepository(prismaClient)
    const tokenService = new JWTTokenService('secret')
    const getAllInvoicesUsecase = new InvoiceUsecase.GetAllInvoicesUsecase(
      invoiceRepository,
      tokenService,
      userRepository
    )

    const userId = new ObjectId().toString() as any
    const savedUser = userBuilder()
      .withId(userId)
      .withRole(ROLE.ADMIN)
      .withLinkedAccounts({ google: { id: 'google-id' } })
      .buildGoogleUser()
    await userRepository.save(User.fromData(savedUser.data))

    const token = tokenService.createConnectToken({
      id: userId,
      role: ROLE.ADMIN,
    })

    const invoiceId = new ObjectId().toString()
    const firstInvoice = invoiceBuilder()
      .withId(invoiceId)
      .withOwner(userId)
      .withStatus('pending')
      .build()
    await invoiceRepository.save(firstInvoice)

    const secondInvoiceId = new ObjectId().toString()
    const secondInvoice = invoiceBuilder()
      .withId(secondInvoiceId)
      .withOwner(userId)
      .withStatus('pending')
      .build()
    await invoiceRepository.save(secondInvoice)

    const invoices = await getAllInvoicesUsecase.handle({ token })

    expect(invoices.length).toEqual(2)
  })

  test('should return one invoices', async () => {
    const userRepository = new PrismaUserRepository(prismaClient)
    const invoiceRepository = new PrismaInvoiceRepository(prismaClient)
    const tokenService = new JWTTokenService('secret')
    const getOneInvoiceUsecase = new InvoiceUsecase.GetOneInvoiceUsecase(
      invoiceRepository,
      userRepository,
      tokenService
    )

    const userId = new ObjectId().toString() as any
    const savedUser = userBuilder()
      .withId(userId)
      .withRole(ROLE.USER)
      .withLinkedAccounts({ google: { id: 'google-id' } })
      .buildGoogleUser()
    await userRepository.save(User.fromData(savedUser.data))

    const token = tokenService.createConnectToken({
      id: userId,
      role: ROLE.USER,
    })

    const invoiceId = new ObjectId().toString()
    const firstInvoice = invoiceBuilder()
      .withId(invoiceId)
      .withOwner(userId)
      .withStatus('pending')
      .build()
    await invoiceRepository.save(firstInvoice)

    const secondInvoiceId = new ObjectId().toString()
    const secondInvoice = invoiceBuilder()
      .withId(secondInvoiceId)
      .withOwner(userId)
      .withStatus('pending')
      .build()
    await invoiceRepository.save(secondInvoice)

    const returnInvoice = await getOneInvoiceUsecase.handle({
      id: invoiceId,
      token,
    })

    expect(returnInvoice).toEqual(firstInvoice.data)
  })
})
