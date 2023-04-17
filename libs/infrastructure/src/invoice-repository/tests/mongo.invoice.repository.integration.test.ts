import { DataSource } from 'typeorm'
import * as path from 'path'
import { ObjectId } from 'mongodb'
import { MongoInvoiceRepository } from '../mongo.invoice.repository'
import DockerCompose, { IDockerComposeOptions } from 'docker-compose'
import { TypeormMongoInvoice } from '../../mongo/entity/Invoice'
import { TypeormMongoUser } from '../../mongo/entity/User'
import { JWTTokenService } from '../../token-service/jwt/jwt-token-service'
import {
  PostInvoiceCommand,
  PostInvoiceUsecase,
} from '@invoice/domain/dist/invoice/usecases/post-invoice.usecase'
import { DeleteInvoiceUsecase } from '@invoice/domain/dist/invoice/usecases/delete-invoice.usecase'
import { GetAllInvoicesUsecase } from '@invoice/domain/dist/invoice/usecases/get-all-invoices.usecase'
import { GetOneInvoiceUsecase } from '@invoice/domain/dist/invoice/usecases/get-one-usecase'
import { UpdateInvoiceUsecase } from '@invoice/domain/dist/invoice/usecases/update-invoice.usecase'
import { UpdateInvoiceStatusUsecase } from '@invoice/domain/dist/invoice/usecases/update-status.usecase'
import { Token } from '@invoice/domain/dist/token/token'
import { MongoUserRepository } from '../../user-repository/mongo-user.repository'
import { ROLE } from '@invoice/domain/dist/user'
import { userBuilder } from '@invoice/domain/dist/user/tests/userBuilder'
import { invoiceBuilder } from '@invoice/domain/dist/tests/invoice/invoiceBuilder'

describe('integration mongodb', () => {
  let composeOptions: IDockerComposeOptions
  let dataSource: DataSource

  beforeAll(async () => {
    composeOptions = {
      config: path.join(__dirname + '../../../../docker-compose.yaml'),
    }
    await DockerCompose.upOne('mongo')
  }, 10000)

  beforeEach(async () => {
    dataSource = new DataSource({
      type: 'mongodb',
      url: 'mongodb://127.0.0.1:27017',
      useNewUrlParser: true,
      database: 'invoice',
      synchronize: true,
      logging: true,
      entities: [TypeormMongoInvoice, TypeormMongoUser],
      useUnifiedTopology: true,
      dropSchema: true,
    })
    await dataSource.initialize()
  }, 10000)

  afterEach(async () => {
    await dataSource.destroy()
  })

  afterAll(async () => {
    await DockerCompose.down(composeOptions)
  }, 10000)

  test('should save invoice', async () => {
    const invoiceRepository = dataSource.getRepository(TypeormMongoInvoice)
    const tokenService = new JWTTokenService('secret')
    const mongoInvoiceRepository = new MongoInvoiceRepository(invoiceRepository)
    const postInvoiceUsecase = new PostInvoiceUsecase(
      mongoInvoiceRepository,
      tokenService
    )

    const mongoInvoiceId = new ObjectId().toString() as any

    const fakeInvoice = invoiceBuilder().withId(mongoInvoiceId)

    const invoiceToSave = invoiceBuilder().withId(mongoInvoiceId).build()

    const fakeToken: Token = { id: 'fake-user-token', role: 300 }

    const postInvoiceCommand: PostInvoiceCommand = {
      id: invoiceToSave.id,
      buyer: invoiceToSave.buyer,
      contact: invoiceToSave.contact,
      products: invoiceToSave.products,
      sender: invoiceToSave.sender,
      date: invoiceToSave.date,
      dueDate: invoiceToSave.dueDate,
      description: invoiceToSave.description,
    }

    await postInvoiceUsecase.handle(
      postInvoiceCommand,
      tokenService.createConnectToken(fakeToken)
    )

    const inDbInvoice = await invoiceRepository.findOne({
      where: { _id: new ObjectId(mongoInvoiceId) as any },
    })
    expect(inDbInvoice?.toDomainInvoice().data).toEqual(
      fakeInvoice.withOwner('fake-user-token').build().data
    )

    const inDbInvoices = await invoiceRepository.find()
    expect(inDbInvoices.length).toEqual(1)
  })

  test('should update invoice', async () => {
    const invoiceRepository = dataSource.getRepository(TypeormMongoInvoice)
    const mongoInvoiceRepository = new MongoInvoiceRepository(invoiceRepository)
    const tokenService = new JWTTokenService('secret')
    const userRepository = dataSource.getRepository(TypeormMongoUser)
    const mongoUserRepository = new MongoUserRepository(userRepository)
    const updateInvoiceUsecase = new UpdateInvoiceUsecase(
      mongoInvoiceRepository,
      mongoUserRepository,
      tokenService
    )

    const mongoUserId = new ObjectId().toString() as any
    const existingUser = userBuilder().withId(mongoUserId).withRole(ROLE.USER)
    await userRepository.save(
      TypeormMongoUser.fromDomainUser(existingUser.buildGoogleUser())
    )

    const mongoInvoiceId = new ObjectId().toString() as any
    const existingInvoice = invoiceBuilder()
      .withId(mongoInvoiceId)
      .withOwner(mongoUserId)
      .withDescription('test-1')
      .build()
    await invoiceRepository.save(
      TypeormMongoInvoice.fromDomainInvoice(existingInvoice)
    )

    await updateInvoiceUsecase.handle({
      invoiceToUpdate: {
        id: existingInvoice.id,
        description: 'test-2',
      },
      token: tokenService.createConnectToken({
        id: mongoUserId,
        role: ROLE.USER,
      }),
    })

    const inDbInvoice = await invoiceRepository.findOne({
      where: { _id: new ObjectId(mongoInvoiceId) as any },
    })
    expect({ ...existingInvoice.data, description: 'test-2' }).toEqual(
      inDbInvoice?.toDomainInvoice().data
    )

    const inDbInvoices = await invoiceRepository.find()
    expect(inDbInvoices.length).toEqual(1)
  })

  test('should delete invoice', async () => {
    const invoiceRepository = dataSource.getRepository(TypeormMongoInvoice)
    const mongoInvoiceRepository = new MongoInvoiceRepository(invoiceRepository)
    const tokenService = new JWTTokenService('secret')
    const userRepository = dataSource.getRepository(TypeormMongoUser)
    const mongoUserRepository = new MongoUserRepository(userRepository)
    const deleteInvoiceUsecase = new DeleteInvoiceUsecase(
      mongoInvoiceRepository,
      mongoUserRepository,
      tokenService
    )

    const mongoUserId = new ObjectId().toString() as any
    const existingUser = userBuilder().withId(mongoUserId).withRole(ROLE.USER)
    await userRepository.save(
      TypeormMongoUser.fromDomainUser(existingUser.buildGoogleUser())
    )

    const mongoInvoiceId = new ObjectId().toString() as any
    const existingInvoice = invoiceBuilder()
      .withOwner(mongoUserId)
      .withId(mongoInvoiceId)
    await invoiceRepository.save(
      TypeormMongoInvoice.fromDomainInvoice(existingInvoice.build())
    )

    await deleteInvoiceUsecase.handle({
      id: mongoInvoiceId,
      token: tokenService.createConnectToken({
        id: mongoUserId,
        role: ROLE.USER,
      }),
    })

    const inDbInvoices = await invoiceRepository.find()
    expect(inDbInvoices.length).toEqual(0)
  })

  test('should update invoice status', async () => {
    const invoiceRepository = dataSource.getRepository(TypeormMongoInvoice)
    const mongoInvoiceRepository = new MongoInvoiceRepository(invoiceRepository)
    const tokenService = new JWTTokenService('secret')
    const userRepository = dataSource.getRepository(TypeormMongoUser)
    const mongoUserRepository = new MongoUserRepository(userRepository)
    const updateInvoiceStatusUsecase = new UpdateInvoiceStatusUsecase(
      mongoInvoiceRepository,
      mongoUserRepository,
      tokenService
    )

    const mongoUserId = new ObjectId().toString() as any
    const existingUser = userBuilder().withId(mongoUserId).withRole(ROLE.USER)
    await userRepository.save(
      TypeormMongoUser.fromDomainUser(existingUser.buildGoogleUser())
    )

    const mongoInvoiceId = new ObjectId().toString() as any
    const existingInvoice = invoiceBuilder()
      .withId(mongoInvoiceId)
      .withOwner(mongoUserId)
      .withStatus('draft')
    await invoiceRepository.save(
      TypeormMongoInvoice.fromDomainInvoice(existingInvoice.build())
    )

    await updateInvoiceStatusUsecase.handle({
      invoiceToUpdate: { id: existingInvoice.getProps().id, status: 'paid' },
      token: tokenService.createConnectToken({
        id: mongoUserId,
        role: ROLE.USER,
      }),
    })

    const inDbInvoice = await invoiceRepository.findOne({
      where: { _id: new ObjectId(mongoInvoiceId) as any },
    })
    expect(inDbInvoice?.toDomainInvoice().status).toEqual('paid')

    const inDbInvoices = await invoiceRepository.find()
    expect(inDbInvoices.length).toEqual(1)
  })

  test('should return all invoices', async () => {
    const invoiceRepository = dataSource.getRepository(TypeormMongoInvoice)
    const mongoInvoiceRepository = new MongoInvoiceRepository(invoiceRepository)
    const tokenService = new JWTTokenService('secret')
    const userRepository = dataSource.getRepository(TypeormMongoUser)
    const mongoUserRepository = new MongoUserRepository(userRepository)
    const getAllInvoicesUsecase = new GetAllInvoicesUsecase(
      mongoInvoiceRepository,
      tokenService,
      mongoUserRepository
    )

    const userId = new ObjectId().toString() as any
    const user = userBuilder().withId(userId).withRole(300).buildGoogleUser()
    await userRepository.save(TypeormMongoUser.fromDomainUser(user))

    const mongoInvoiceId = new ObjectId().toString() as any
    const existingInvoice = invoiceBuilder()
      .withId(mongoInvoiceId)
      .withOwner(userId)

    await invoiceRepository.save(
      TypeormMongoInvoice.fromDomainInvoice(existingInvoice.build())
    )

    const allInvoices = await getAllInvoicesUsecase.handle({
      token: tokenService.createConnectToken({ id: userId, role: 300 }),
    })

    expect(allInvoices).toEqual(
      [existingInvoice.build()].map((invoice) => invoice.data)
    )
  })

  test('should return all invoices when 2 invoices in db', async () => {
    const invoiceRepository = dataSource.getRepository(TypeormMongoInvoice)
    const mongoInvoiceRepository = new MongoInvoiceRepository(invoiceRepository)
    const tokenService = new JWTTokenService('secret')
    const userRepository = dataSource.getRepository(TypeormMongoUser)
    const mongoUserRepository = new MongoUserRepository(userRepository)
    const getAllInvoicesUsecase = new GetAllInvoicesUsecase(
      mongoInvoiceRepository,
      tokenService,
      mongoUserRepository
    )

    const userId = new ObjectId().toString() as any
    const user = userBuilder().withId(userId).withRole(300).buildGoogleUser()
    await userRepository.save(TypeormMongoUser.fromDomainUser(user))

    const existingInvoices = [
      invoiceBuilder()
        .withId(new ObjectId().toString() as any)
        .withOwner(userId)
        .build(),
      invoiceBuilder()
        .withId(new ObjectId().toString() as any)
        .withOwner(userId)
        .build(),
    ]

    await Promise.all(
      existingInvoices.map((invoice) =>
        invoiceRepository.save(TypeormMongoInvoice.fromDomainInvoice(invoice))
      )
    )

    const allInvoices = await getAllInvoicesUsecase.handle({
      token: tokenService.createConnectToken({ id: userId, role: 300 }),
    })

    expect(allInvoices).toEqual(existingInvoices.map((invoice) => invoice.data))
  })

  test('should return owned invoices', async () => {
    const invoiceRepository = dataSource.getRepository(TypeormMongoInvoice)
    const mongoInvoiceRepository = new MongoInvoiceRepository(invoiceRepository)
    const tokenService = new JWTTokenService('secret')
    const userRepository = dataSource.getRepository(TypeormMongoUser)
    const mongoUserRepository = new MongoUserRepository(userRepository)
    const getAllInvoicesUsecase = new GetAllInvoicesUsecase(
      mongoInvoiceRepository,
      tokenService,
      mongoUserRepository
    )

    const userId = new ObjectId().toString() as any
    const user = userBuilder().withId(userId).withRole(300).buildGoogleUser()
    await userRepository.save(TypeormMongoUser.fromDomainUser(user))

    const existingInvoices = [
      invoiceBuilder()
        .withId(new ObjectId().toString() as any)
        .withOwner(userId)
        .build(),
      invoiceBuilder()
        .withId(new ObjectId().toString() as any)
        .withOwner(new ObjectId() as any)
        .build(),
      invoiceBuilder()
        .withId(new ObjectId().toString() as any)
        .withOwner(userId)
        .build(),
    ]

    await Promise.all(
      existingInvoices.map((invoice) =>
        invoiceRepository.save(TypeormMongoInvoice.fromDomainInvoice(invoice))
      )
    )

    const allInvoices = await getAllInvoicesUsecase.handle({
      token: tokenService.createConnectToken({ id: userId, role: 300 }),
      onlyOwned: true,
    })

    expect(allInvoices).toEqual(
      existingInvoices
        .filter((invoice) => invoice.owner === userId)
        .map((invoice) => invoice.data)
    )
  })

  test('should return expected invoice when multiple invoices in db', async () => {
    const invoiceRepository = dataSource.getRepository(TypeormMongoInvoice)
    const mongoInvoiceRepository = new MongoInvoiceRepository(invoiceRepository)
    const tokenService = new JWTTokenService('secret')
    const userRepository = dataSource.getRepository(TypeormMongoUser)
    const mongoUserRepository = new MongoUserRepository(userRepository)
    const getOneInvoiceUsecase = new GetOneInvoiceUsecase(
      mongoInvoiceRepository,
      mongoUserRepository,
      tokenService
    )

    const userId = new ObjectId().toString() as any
    const user = userBuilder().withId(userId).withRole(100).buildGoogleUser()
    await userRepository.save(TypeormMongoUser.fromDomainUser(user))

    const idToFind = new ObjectId().toString() as any

    const existingInvoices = [
      invoiceBuilder().withOwner(userId).withId(idToFind).build(),
      invoiceBuilder()
        .withId(new ObjectId().toString() as any)
        .build(),
    ]

    await Promise.all(
      existingInvoices.map((invoice) =>
        invoiceRepository.save(TypeormMongoInvoice.fromDomainInvoice(invoice))
      )
    )

    const fundInvoice = await getOneInvoiceUsecase.handle({
      token: tokenService.createConnectToken({ id: userId, role: 100 }),
      id: idToFind,
    })

    expect(fundInvoice).toEqual(
      invoiceBuilder().withOwner(userId).withId(idToFind).build().data
    )
  })
})
