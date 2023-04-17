import { Repository } from 'typeorm'
import { MongoInvoice } from '../entity/Invoice'
import { ObjectId } from 'mongodb'
import { mongoInvoiceToInvoice } from '../utils'
import { InvoiceRepository } from '../domain/invoice/invoice.repository'
import { NotFoundError } from '@invoice/shared/src/domain/errors'
import { Invoice } from '@invoice/shared/src/domain/invoice'

export class MongoInvoiceRepository implements InvoiceRepository {
  constructor(private readonly mongoRepository: Repository<MongoInvoice>) {}

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

    await this.mongoRepository.save(newInvoice)
    return Promise.resolve()
  }

  async getAll(): Promise<Invoice[]> {
    const invoices = await this.mongoRepository.find()
    return invoices.map(invoice => mongoInvoiceToInvoice(invoice))
  }

  getAllByUserId(userId: string): Promise<Invoice[]> {
    const invoices = this.mongoRepository.find({ where: { owner: userId } })
    return invoices.then(invoices => invoices.map(invoice => mongoInvoiceToInvoice(invoice)))
  }
}
