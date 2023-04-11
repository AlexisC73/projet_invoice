import { Repository } from 'typeorm'
import { InvoiceRepository } from '../application/invoice.repository'
import { Invoice } from '../domain/invoice'
import { MongoInvoice } from '../entity/Invoice'
import { ObjectId } from 'mongodb'
import { mongoInvoiceToInvoice } from './utils'
import { NotFoundError } from '../application/errors'

export class MongoInvoiceRepository implements InvoiceRepository {
  constructor(private readonly mongoInvoiceRepository: Repository<MongoInvoice>) {}
  async delete(id: string): Promise<void> {
    await this.mongoInvoiceRepository.delete({ _id: new ObjectId(id) as any })
    return Promise.resolve()
  }

  async findById(id: string): Promise<Invoice> {
    const inDbInvoice = await this.mongoInvoiceRepository.findOne({
      where: { _id: new ObjectId(id) as any },
    })
    if (!inDbInvoice) {
      throw new NotFoundError('Invoice not found')
    }
    return mongoInvoiceToInvoice(inDbInvoice)
  }

  async save(invoice: Invoice): Promise<void> {
    const { date, dueDate, description, currency, status, contact, owner, sender, buyer, products, id } = invoice.data
    const newInvoice = new MongoInvoice()
    newInvoice.date = date
    newInvoice.dueDate = dueDate
    newInvoice.description = description
    newInvoice.currency = currency
    newInvoice.owner = owner
    newInvoice.status = status
    newInvoice.contact = contact
    newInvoice.sender = sender
    newInvoice.buyer = buyer
    newInvoice.products = products
    newInvoice._id = new ObjectId(id) as any

    await this.mongoInvoiceRepository.save(newInvoice)
    return Promise.resolve()
  }
}
