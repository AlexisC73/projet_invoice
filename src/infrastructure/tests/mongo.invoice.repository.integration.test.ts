import { DockerComposeEnvironment, StartedDockerComposeEnvironment } from 'testcontainers'
import { DataSource } from 'typeorm'
import { MongoInvoice } from '../../entity/Invoice'
import * as path from 'path'
import { PostInvoiceCommand, PostInvoiceUsecase } from '../../application/invoice/usecase/post-invoice.usecase'
import { invoiceBuilder } from '../../application/invoice/usecase/tests/invoiceBuilder'
import { ObjectId } from 'mongodb'
import { MongoInvoiceRepository } from '../mongo.invoice.repository'
import { mongoInvoiceToInvoice } from '../utils'

describe('integration mongodb', () => {
  let mongoContainer: StartedDockerComposeEnvironment
  let dataSource: DataSource

  beforeAll(async () => {
    mongoContainer = await new DockerComposeEnvironment(
      path.join(__dirname + '../../../..'),
      'docker-compose.yaml'
    ).up()
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
    await mongoContainer.down()
  }, 10000)

  test('should save invoice', async () => {
    const invoiceRepository = dataSource.getRepository(MongoInvoice)
    const mongoInvoiceRepository = new MongoInvoiceRepository(invoiceRepository)
    const postInvoiceUsecase = new PostInvoiceUsecase(mongoInvoiceRepository)

    const mongoInvoiceId = new ObjectId().toString() as any
    const invoiceToSave = invoiceBuilder().withId(mongoInvoiceId).build()

    const postInvoiceCommand: PostInvoiceCommand = {
      id: mongoInvoiceId,
      buyer: invoiceToSave.buyer,
      contact: invoiceToSave.contact,
      items: invoiceToSave.items,
      owner: invoiceToSave.owner,
      sender: invoiceToSave.sender,
      status: invoiceToSave.status,
      currency: invoiceToSave.currency,
      date: invoiceToSave.date,
      dueDate: invoiceToSave.dueDate,
      description: invoiceToSave.description,
    }

    await postInvoiceUsecase.handle(postInvoiceCommand)

    const inDbInvoice = await invoiceRepository.findOne({ where: { _id: new ObjectId(mongoInvoiceId) as any } })

    expect(invoiceToSave.data).toEqual(mongoInvoiceToInvoice(inDbInvoice).data)
  })
})
