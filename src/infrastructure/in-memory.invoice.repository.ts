import { InvoiceRepository } from '../application/invoice.repository'
import { Invoice } from '../domain/invoice'

export class InMemoryInvoiceRepository implements InvoiceRepository {
  private invoices: Invoice[] = []

  async save(invoice: Invoice): Promise<void> {
    this.invoices.push(invoice)
    return Promise.resolve()
  }

  find(id: string): Promise<Invoice> {
    return Promise.resolve(this.invoices.find(invoice => invoice.id === id))
  }
}
