import { Invoice } from '../domain/invoice'

export interface InvoiceRepository {
  save(invoice: Invoice): Promise<void>
  find(id: string): Promise<Invoice | null>
}
