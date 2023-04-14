import { DataSource } from 'typeorm'
import { MongoInvoice } from '../../entity/Invoice'
import * as path from 'path'
import { PostInvoiceCommand, PostInvoiceUsecase } from '../../application/invoice/usecase/post-invoice.usecase'
import { invoiceBuilder } from '../../domain/invoice/tests/invoiceBuilder'
import { ObjectId } from 'mongodb'
import { MongoInvoiceRepository } from '../mongo.invoice.repository'
import { invoiceToMongoInvoice, mongoInvoiceToInvoice, userToMongoUser } from '../utils'
import DockerCompose, { IDockerComposeOptions } from 'docker-compose'
import { UpdateInvoiceUsecase } from '../../application/invoice/usecase/update-invoice.usecase'
import { DeleteInvoiceUsecase } from '../../application/invoice/usecase/delete-invoice.usecase'
import { UpdateInvoiceStatusUsecase } from '../../application/invoice/usecase/update-status.usecase'
import { GetAllInvoicesUsecase } from '../../application/invoice/usecase/get-all-invoices.usecase'
import { GetOneInvoiceUsecase } from '../../application/invoice/usecase/get-one-usecase'
import { JWTTokenService } from '../jwt-token-service'
import { Token } from '../../application/token-service'
import { MongoUserRepository } from '../mongo-user.repository'
import { MongoUser } from '../../entity/User'
import { userBuilder } from '../../domain/user/tests/userBuilder'
import { ROLE } from '../../domain/user'

describe('integration mongodb', () => {
  let composeOptions: IDockerComposeOptions
  let dataSource: DataSource

  beforeAll(async () => {
    composeOptions = { config: path.join(__dirname + '../../../../docker-compose.yaml') }
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
      entities: [MongoInvoice, MongoUser],
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
    const invoiceRepository = dataSource.getRepository(MongoInvoice)
    const tokenService = new JWTTokenService('secret')
    const mongoInvoiceRepository = new MongoInvoiceRepository(invoiceRepository)
    const postInvoiceUsecase = new PostInvoiceUsecase(mongoInvoiceRepository, tokenService)

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

    await postInvoiceUsecase.handle(postInvoiceCommand, tokenService.createConnectToken(fakeToken))

    const inDbInvoice = await invoiceRepository.findOne({ where: { _id: new ObjectId(mongoInvoiceId) as any } })
    expect(mongoInvoiceToInvoice(inDbInvoice).data).toEqual(fakeInvoice.withOwner('fake-user-token').build().data)

    const inDbInvoices = await invoiceRepository.find()
    expect(inDbInvoices.length).toEqual(1)
  })

  test('should update invoice', async () => {
    const invoiceRepository = dataSource.getRepository(MongoInvoice)
    const mongoInvoiceRepository = new MongoInvoiceRepository(invoiceRepository)
    const tokenService = new JWTTokenService('secret')
    const userRepository = dataSource.getRepository(MongoUser)
    const mongoUserRepository = new MongoUserRepository(userRepository)
    const updateInvoiceUsecase = new UpdateInvoiceUsecase(mongoInvoiceRepository, mongoUserRepository, tokenService)

    const mongoUserId = new ObjectId().toString() as any
    const existingUser = userBuilder().withId(mongoUserId).withRole(ROLE.USER)
    await userRepository.save(userToMongoUser(existingUser.buildGoogleUser()))

    const mongoInvoiceId = new ObjectId().toString() as any
    const existingInvoice = invoiceBuilder().withId(mongoInvoiceId).withOwner(mongoUserId).withDescription('test-1')
    await invoiceRepository.save(invoiceToMongoInvoice(existingInvoice.build()))

    const updatedInvoice = existingInvoice.withDescription('test-2').getProps()
    await updateInvoiceUsecase.handle({
      invoiceToUpdate: updatedInvoice,
      token: tokenService.createConnectToken({ id: mongoUserId, role: ROLE.USER }),
    })

    const inDbInvoice = await invoiceRepository.findOne({ where: { _id: new ObjectId(mongoInvoiceId) as any } })
    expect(updatedInvoice).toEqual(mongoInvoiceToInvoice(inDbInvoice).data)

    const inDbInvoices = await invoiceRepository.find()
    expect(inDbInvoices.length).toEqual(1)
  })

  test('should delete invoice', async () => {
    const invoiceRepository = dataSource.getRepository(MongoInvoice)
    const mongoInvoiceRepository = new MongoInvoiceRepository(invoiceRepository)
    const deleteInvoiceUsecase = new DeleteInvoiceUsecase(mongoInvoiceRepository)

    const mongoInvoiceId = new ObjectId().toString() as any
    const existingInvoice = invoiceBuilder().withId(mongoInvoiceId)

    await invoiceRepository.save(invoiceToMongoInvoice(existingInvoice.build()))

    await deleteInvoiceUsecase.handle({ id: mongoInvoiceId })

    const inDbInvoices = await invoiceRepository.find()
    expect(inDbInvoices.length).toEqual(0)
  })

  test('should update invoice status', async () => {
    const invoiceRepository = dataSource.getRepository(MongoInvoice)
    const mongoInvoiceRepository = new MongoInvoiceRepository(invoiceRepository)
    const tokenService = new JWTTokenService('secret')
    const userRepository = dataSource.getRepository(MongoUser)
    const mongoUserRepository = new MongoUserRepository(userRepository)
    const updateInvoiceStatusUsecase = new UpdateInvoiceStatusUsecase(
      mongoInvoiceRepository,
      mongoUserRepository,
      tokenService
    )

    const mongoUserId = new ObjectId().toString() as any
    const existingUser = userBuilder().withId(mongoUserId).withRole(ROLE.USER)
    await userRepository.save(userToMongoUser(existingUser.buildGoogleUser()))

    const mongoInvoiceId = new ObjectId().toString() as any
    const existingInvoice = invoiceBuilder().withId(mongoInvoiceId).withOwner(mongoUserId).withStatus('draft')
    await invoiceRepository.save(invoiceToMongoInvoice(existingInvoice.build()))

    await updateInvoiceStatusUsecase.handle({
      invoiceToUpdate: { id: existingInvoice.getProps().id, status: 'paid' },
      token: tokenService.createConnectToken({ id: mongoUserId, role: ROLE.USER }),
    })

    const inDbInvoice = await invoiceRepository.findOne({ where: { _id: new ObjectId(mongoInvoiceId) as any } })
    expect(mongoInvoiceToInvoice(inDbInvoice).status).toEqual('paid')

    const inDbInvoices = await invoiceRepository.find()
    expect(inDbInvoices.length).toEqual(1)
  })

  test('should return all invoices', async () => {
    const invoiceRepository = dataSource.getRepository(MongoInvoice)
    const mongoInvoiceRepository = new MongoInvoiceRepository(invoiceRepository)
    const tokenService = new JWTTokenService('secret')
    const userRepository = dataSource.getRepository(MongoUser)
    const mongoUserRepository = new MongoUserRepository(userRepository)
    const getAllInvoicesUsecase = new GetAllInvoicesUsecase(mongoInvoiceRepository, tokenService, mongoUserRepository)

    const userId = new ObjectId().toString() as any
    const user = userBuilder().withId(userId).withRole(300).buildGoogleUser()
    await userRepository.save(userToMongoUser(user))

    const mongoInvoiceId = new ObjectId().toString() as any
    const existingInvoice = invoiceBuilder().withId(mongoInvoiceId).withOwner(userId)

    await invoiceRepository.save(invoiceToMongoInvoice(existingInvoice.build()))

    const allInvoices = await getAllInvoicesUsecase.handle({
      token: tokenService.createConnectToken({ id: userId, role: 300 }),
    })

    expect(allInvoices).toEqual([existingInvoice.build()].map(invoice => invoice.data))
  })

  test('should return all invoices when 2 invoices in db', async () => {
    const invoiceRepository = dataSource.getRepository(MongoInvoice)
    const mongoInvoiceRepository = new MongoInvoiceRepository(invoiceRepository)
    const tokenService = new JWTTokenService('secret')
    const userRepository = dataSource.getRepository(MongoUser)
    const mongoUserRepository = new MongoUserRepository(userRepository)
    const getAllInvoicesUsecase = new GetAllInvoicesUsecase(mongoInvoiceRepository, tokenService, mongoUserRepository)

    const userId = new ObjectId().toString() as any
    const user = userBuilder().withId(userId).withRole(300).buildGoogleUser()
    await userRepository.save(userToMongoUser(user))

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

    await Promise.all(existingInvoices.map(invoice => invoiceRepository.save(invoiceToMongoInvoice(invoice))))

    const allInvoices = await getAllInvoicesUsecase.handle({
      token: tokenService.createConnectToken({ id: userId, role: 300 }),
    })

    expect(allInvoices).toEqual(existingInvoices.map(invoice => invoice.data))
  })

  test('should return owned invoices', async () => {
    const invoiceRepository = dataSource.getRepository(MongoInvoice)
    const mongoInvoiceRepository = new MongoInvoiceRepository(invoiceRepository)
    const tokenService = new JWTTokenService('secret')
    const userRepository = dataSource.getRepository(MongoUser)
    const mongoUserRepository = new MongoUserRepository(userRepository)
    const getAllInvoicesUsecase = new GetAllInvoicesUsecase(mongoInvoiceRepository, tokenService, mongoUserRepository)

    const userId = new ObjectId().toString() as any
    const user = userBuilder().withId(userId).withRole(300).buildGoogleUser()
    await userRepository.save(userToMongoUser(user))

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

    await Promise.all(existingInvoices.map(invoice => invoiceRepository.save(invoiceToMongoInvoice(invoice))))

    const allInvoices = await getAllInvoicesUsecase.handle({
      token: tokenService.createConnectToken({ id: userId, role: 300 }),
      onlyOwned: true,
    })

    expect(allInvoices).toEqual(
      existingInvoices.filter(invoice => invoice.owner === userId).map(invoice => invoice.data)
    )
  })

  test('should return expected invoice when multiple invoices in db', async () => {
    const invoiceRepository = dataSource.getRepository(MongoInvoice)
    const mongoInvoiceRepository = new MongoInvoiceRepository(invoiceRepository)
    const tokenService = new JWTTokenService('secret')
    const userRepository = dataSource.getRepository(MongoUser)
    const mongoUserRepository = new MongoUserRepository(userRepository)
    const getOneInvoiceUsecase = new GetOneInvoiceUsecase(mongoInvoiceRepository, mongoUserRepository, tokenService)

    const userId = new ObjectId().toString() as any
    const user = userBuilder().withId(userId).withRole(100).buildGoogleUser()
    await userRepository.save(userToMongoUser(user))

    const idToFind = new ObjectId().toString() as any

    const existingInvoices = [
      invoiceBuilder().withOwner(userId).withId(idToFind).build(),
      invoiceBuilder()
        .withId(new ObjectId().toString() as any)
        .build(),
    ]

    await Promise.all(existingInvoices.map(invoice => invoiceRepository.save(invoiceToMongoInvoice(invoice))))

    const fundInvoice = await getOneInvoiceUsecase.handle({
      token: tokenService.createConnectToken({ id: userId, role: 100 }),
      id: idToFind,
    })

    expect(fundInvoice).toEqual(invoiceBuilder().withOwner(userId).withId(idToFind).build().data)
  })
})
