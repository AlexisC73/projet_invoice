import { Invoice } from '../../../domain/invoice'
import { InvoiceRepository } from '../../invoice.repository'

export class GetAllInvoicesUsecase {
  constructor(private invoiceRepository: InvoiceRepository) {}

  async handle(): Promise<Invoice[]> {
    const invoices = await this.invoiceRepository.getAll()
    return invoices
  }
}
