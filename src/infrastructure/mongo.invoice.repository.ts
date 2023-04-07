import { Repository } from 'typeorm'
import { InvoiceRepository } from '../application/invoice.repository'
import { Invoice } from '../domain/invoice'
import { MongoInvoice } from '../entity/Invoice'

export class MongoInvoiceRepository implements InvoiceRepository {
  constructor(private readonly mongoInvoiceRepository: Repository<MongoInvoice>) {}

  async save(invoice: Invoice): Promise<void> {
    const invoiceToSave = new MongoInvoice()
    invoiceToSave.updateInvoice(invoice)
    await this.mongoInvoiceRepository.save(invoiceToSave)
    return Promise.resolve()
  }
}
