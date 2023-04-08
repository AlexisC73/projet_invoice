import { Repository } from 'typeorm'
import { InvoiceRepository } from '../application/invoice.repository'
import { Invoice } from '../domain/invoice'
import { MongoInvoice } from '../entity/Invoice'
import { ObjectId } from 'mongodb'

export class MongoInvoiceRepository implements InvoiceRepository {
  constructor(private readonly mongoInvoiceRepository: Repository<MongoInvoice>) {}

  async save(invoice: Invoice): Promise<void> {
    const { date, dueDate, description, currency, status, contact, owner, sender, buyer, items, id } = invoice.data
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
    newInvoice.items = items
    newInvoice._id = new ObjectId(id) as any

    await this.mongoInvoiceRepository.save(newInvoice)
    return Promise.resolve()
  }
}
