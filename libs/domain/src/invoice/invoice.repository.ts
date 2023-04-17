import { Invoice } from '.'

export interface InvoiceRepository {
  save(invoice: Invoice): Promise<void>
  findById(id: string): Promise<Invoice | null>
  delete(id: string): Promise<void>
  getAll(): Promise<Invoice[]>
  getAllByUserId(userId: string): Promise<Invoice[]>
}
