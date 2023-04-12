import { InvoiceRepository } from '../../invoice.repository'

export class GetOneInvoiceUsecase {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  async handle(id: string) {
    return await this.invoiceRepository.findById(id)
  }
}
