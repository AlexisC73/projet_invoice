import { Repository } from 'typeorm'
import { TypeormMongoInvoice } from '../mongo/entity/Invoice'
import { ObjectId } from 'mongodb'
import { InvoiceRepository } from '@invoice/domain/dist/invoice/invoice.repository'
import { NotFoundError } from '@invoice/domain/dist/errors'
import { Invoice } from '@invoice/domain/dist/invoice'
import 'reflect-metadata'

export class MongoInvoiceRepository implements InvoiceRepository {
  constructor(
    private readonly mongoRepository: Repository<TypeormMongoInvoice>
  ) {}

  async delete(id: string): Promise<void> {
    await this.mongoRepository.delete({ _id: new ObjectId(id) as any })
    return Promise.resolve()
  }

  async findById(id: string): Promise<Invoice> {
    const inDbInvoice = await this.mongoRepository.findOne({
      where: { _id: new ObjectId(id) as any },
    })
    if (!inDbInvoice) {
      throw new NotFoundError('Invoice not found')
    }
    return inDbInvoice.toDomainInvoice()
  }

  async save(invoice: Invoice): Promise<void> {
    const {
      date,
      dueDate,
      description,
      currency,
      status,
      contact,
      owner,
      sender,
      buyer,
      products,
      id,
    } = invoice.data

    const newInvoice = new TypeormMongoInvoice()
    newInvoice._id = new ObjectId(id) as any
    newInvoice.date = date
    newInvoice.dueDate = dueDate
    newInvoice.description = description
    newInvoice.currency = currency
    newInvoice.status = status
    newInvoice.contact = contact
    newInvoice.owner = owner
    newInvoice.sender = sender
    newInvoice.buyer = buyer
    newInvoice.products = products

    await this.mongoRepository.save(newInvoice)
    return Promise.resolve()
  }

  async getAll(): Promise<Invoice[]> {
    const invoices = await this.mongoRepository.find()
    return invoices.map((invoice) => invoice.toDomainInvoice())
  }

  getAllByUserId(userId: string): Promise<Invoice[]> {
    const invoices = this.mongoRepository.find({ where: { owner: userId } })
    return invoices.then((invoices) =>
      invoices.map((invoice) => invoice.toDomainInvoice())
    )
  }
}
