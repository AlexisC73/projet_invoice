import { Invoice } from '../../../domain/invoice'
import { InvoiceRepository } from '../../invoice.repository'

export class GetOneInvoiceUsecase {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  async handle(id: string): Promise<Invoice['data']> {
    const fund = await this.invoiceRepository.findById(id)
    return fund.data
  }
}
