import { Invoice } from '../domain/invoice'

export interface InvoiceRepository {
  save(invoice: Invoice): Promise<void>
  findById(id: string): Promise<Invoice | null>
}
