import { InvoiceRepository } from '../application/invoice.repository'
import { Invoice } from '../domain/invoice'

export class InMemoryInvoiceRepository implements InvoiceRepository {
  private invoices: Invoice[] = []

  async save(invoice: Invoice): Promise<void> {
    if (this.invoices.find(invoice => invoice.id === invoice.id)) {
      this.invoices = this.invoices.map(i => (i.id === invoice.id ? invoice : i))
      return Promise.resolve()
    }
    this.invoices.push(invoice)
    return Promise.resolve()
  }

  setInvoices(invoice: Invoice | Invoice[]): void {
    if (Array.isArray(invoice)) {
      this.invoices = invoice
      return
    }
    this.invoices.push(invoice)
  }

  async find(id: string): Promise<Invoice> {
    return Promise.resolve(this.invoices.find(invoice => invoice.id === id))
  }
}
