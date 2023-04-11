import { NotFoundError } from '../../errors'
import { InvoiceRepository } from '../../invoice.repository'

export class DeleteInvoiceUsecase {
  constructor(private repository: InvoiceRepository) {}

  async handle(deleteInvoiceCommand: DeleteInvoiceCommand): Promise<void> {
    const invoice = await this.repository.findById(deleteInvoiceCommand.id)
    if (!invoice) {
      throw new NotFoundError('Invoice not found')
    }
    await this.repository.delete(deleteInvoiceCommand.id)
    return Promise.resolve()
  }
}

export type DeleteInvoiceCommand = {
  id: string
}
