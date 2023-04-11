import { Address, Invoice, Product } from '../../../domain/invoice'
import { NotFoundError } from '../../errors'
import { InvoiceRepository } from '../../invoice.repository'

export class UpdateInvoiceUsecase {
  constructor(private invoiceRepository: InvoiceRepository) {}

  async handle(updateInvoiceCommand: UpdateInvoiceCommand): Promise<void> {
    const invoice = await this.invoiceRepository.find(updateInvoiceCommand.id)
    if (!invoice) throw new NotFoundError('Invoice does not exists')
    const { date, dueDate, description, currency, contact, owner, sender, buyer, products } = updateInvoiceCommand
    const updatedInvoice = Invoice.fromData({
      ...invoice.data,
      date,
      dueDate,
      description,
      currency: currency || invoice.currency,
      contact,
      owner,
      sender,
      buyer,
      products,
    })
    await this.invoiceRepository.save(updatedInvoice)
  }
}

export type UpdateInvoiceCommand = {
  id: string
  date: string
  dueDate: string
  description: string
  currency?: string
  contact: string
  owner: string
  sender: Address['data']
  buyer: {
    name: string
    address: Address['data']
  }
  products: Product['data'][]
}
