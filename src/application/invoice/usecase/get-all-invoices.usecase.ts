import { Invoice } from '../../../domain/invoice'
import { InvoiceRepository } from '../../invoice.repository'

export class GetAllInvoicesUsecase {
  constructor(private invoiceRepository: InvoiceRepository) {}

  async handle(): Promise<Invoice['data'][]> {
    const invoices = await this.invoiceRepository.getAll()
    return invoices.map(invoice => invoice.data)
  }
}
