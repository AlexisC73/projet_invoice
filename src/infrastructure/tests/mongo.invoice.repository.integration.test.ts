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
    const mongoInvoiceRepository = new MongoInvoiceRepository(invoiceRepository)
    const postInvoiceUsecase = new PostInvoiceUsecase(mongoInvoiceRepository)

    const mongoInvoiceId = new ObjectId().toString() as any
    const invoiceToSave = invoiceBuilder().withId(mongoInvoiceId).build()

    const postInvoiceCommand: PostInvoiceCommand = {
      id: invoiceToSave.id,
      buyer: invoiceToSave.buyer,
      contact: invoiceToSave.contact,
      products: invoiceToSave.products,
      owner: invoiceToSave.owner,
      sender: invoiceToSave.sender,
      date: invoiceToSave.date,
      dueDate: invoiceToSave.dueDate,
      description: invoiceToSave.description,
    }

    await postInvoiceUsecase.handle(postInvoiceCommand)

    const inDbInvoice = await invoiceRepository.findOne({ where: { _id: new ObjectId(mongoInvoiceId) as any } })
    expect(invoiceToSave.data).toEqual(mongoInvoiceToInvoice(inDbInvoice).data)

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

    expect(allInvoices).toEqual([existingInvoice.build()])
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

    expect(allInvoices).toEqual(existingInvoices)
  })
})
