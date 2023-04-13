import { DataSource } from 'typeorm'
import { MongoInvoice } from '../../entity/Invoice'
import * as path from 'path'
import { PostInvoiceCommand, PostInvoiceUsecase } from '../../application/invoice/usecase/post-invoice.usecase'
import { invoiceBuilder } from '../../domain/invoice/tests/invoiceBuilder'
import { ObjectId } from 'mongodb'
import { MongoInvoiceRepository } from '../mongo.invoice.repository'
import { invoiceToMongoInvoice, mongoInvoiceToInvoice } from '../utils'
import DockerCompose, { IDockerComposeOptions } from 'docker-compose'
import { UpdateInvoiceUsecase } from '../../application/invoice/usecase/update-invoice.usecase'
import { DeleteInvoiceUsecase } from '../../application/invoice/usecase/delete-invoice.usecase'
import { UpdateInvoiceStatusUsecase } from '../../application/invoice/usecase/update-status.usecase'
import { GetAllInvoicesUsecase } from '../../application/invoice/usecase/get-all-invoices.usecase'
import { GetOneInvoiceUsecase } from '../../application/invoice/usecase/get-one-usecase'
import { JWTTokenService } from '../jwt-token-service'
import { Token } from '../../application/token-service'

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
      entities: [MongoInvoice],
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

    const fakeToken: Token = { id: 'fake-user-token' }

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
    const updateInvoiceUsecase = new UpdateInvoiceUsecase(mongoInvoiceRepository)

    const mongoInvoiceId = new ObjectId().toString() as any
    const existingInvoice = invoiceBuilder().withId(mongoInvoiceId).withContact('paul')

    await invoiceRepository.save(invoiceToMongoInvoice(existingInvoice.build()))

    const updatedInvoice = existingInvoice.withContact('jean').getProps()
    await updateInvoiceUsecase.handle(updatedInvoice)

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
    const updateInvoiceStatusUsecase = new UpdateInvoiceStatusUsecase(mongoInvoiceRepository)

    const mongoInvoiceId = new ObjectId().toString() as any
    const existingInvoice = invoiceBuilder().withId(mongoInvoiceId).withStatus('draft')

    await invoiceRepository.save(invoiceToMongoInvoice(existingInvoice.build()))

    await updateInvoiceStatusUsecase.handle(existingInvoice.getProps().id, 'paid')

    const inDbInvoice = await invoiceRepository.findOne({ where: { _id: new ObjectId(mongoInvoiceId) as any } })
    expect(mongoInvoiceToInvoice(inDbInvoice).status).toEqual('paid')

    const inDbInvoices = await invoiceRepository.find()
    expect(inDbInvoices.length).toEqual(1)
  })

  test('should return all invoices', async () => {
    const invoiceRepository = dataSource.getRepository(MongoInvoice)
    const mongoInvoiceRepository = new MongoInvoiceRepository(invoiceRepository)
    const getAllInvoicesUsecase = new GetAllInvoicesUsecase(mongoInvoiceRepository)

    const mongoInvoiceId = new ObjectId().toString() as any
    const existingInvoice = invoiceBuilder().withId(mongoInvoiceId)

    await invoiceRepository.save(invoiceToMongoInvoice(existingInvoice.build()))

    const allInvoices = await getAllInvoicesUsecase.handle()

    expect(allInvoices).toEqual([existingInvoice.build()].map(invoice => invoice.data))
  })

  test('should return all invoices when 2 invoices in db', async () => {
    const invoiceRepository = dataSource.getRepository(MongoInvoice)
    const mongoInvoiceRepository = new MongoInvoiceRepository(invoiceRepository)
    const getAllInvoicesUsecase = new GetAllInvoicesUsecase(mongoInvoiceRepository)

    const existingInvoices = [
      invoiceBuilder()
        .withId(new ObjectId().toString() as any)
        .build(),
      invoiceBuilder()
        .withId(new ObjectId().toString() as any)
        .build(),
    ]

    await Promise.all(existingInvoices.map(invoice => invoiceRepository.save(invoiceToMongoInvoice(invoice))))

    const allInvoices = await getAllInvoicesUsecase.handle()

    expect(allInvoices).toEqual(existingInvoices.map(invoice => invoice.data))
  })

  test('should return expected invoice when multiple invoices in db', async () => {
    const invoiceRepository = dataSource.getRepository(MongoInvoice)
    const mongoInvoiceRepository = new MongoInvoiceRepository(invoiceRepository)
    const getOneInvoiceUsecase = new GetOneInvoiceUsecase(mongoInvoiceRepository)

    const idToFind = new ObjectId().toString() as any

    const existingInvoices = [
      invoiceBuilder().withId(idToFind).build(),
      invoiceBuilder()
        .withId(new ObjectId().toString() as any)
        .build(),
    ]

    await Promise.all(existingInvoices.map(invoice => invoiceRepository.save(invoiceToMongoInvoice(invoice))))

    const fundInvoice = await getOneInvoiceUsecase.handle(idToFind)

    expect(fundInvoice).toEqual(invoiceBuilder().withId(idToFind).build().data)
  })
})
