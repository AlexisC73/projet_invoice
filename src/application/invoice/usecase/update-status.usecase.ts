import { Invoice } from '../../../domain/invoice'
import { NotFoundError } from '../../errors'
import { InvoiceRepository } from '../../invoice.repository'

export class UpdateInvoiceStatusUsecase {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  async handle(id: string, status: string) {
    const invoice = await this.invoiceRepository.findById(id)
    if (!invoice) throw new NotFoundError('Invoice not found')
    const updatedInvoice = Invoice.fromData({ ...invoice.data, status })
    await this.invoiceRepository.save(updatedInvoice)
    return Promise.resolve()
  }
}
