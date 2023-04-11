import { Address, Invoice, Product } from '../../../domain/invoice'
import { InvoiceRepository } from '../../invoice.repository'

export class PostInvoiceUsecase {
  constructor(private invoiceRepository: InvoiceRepository) {}

  async handle(postInvoiceCommand: PostInvoiceCommand): Promise<void> {
    const invoice: Invoice = Invoice.fromData({
      id: postInvoiceCommand.id,
      date: postInvoiceCommand.date,
      dueDate: postInvoiceCommand.dueDate,
      description: postInvoiceCommand.description,
      currency: postInvoiceCommand.currency ?? 'USD',
      status: 'pending',
      contact: postInvoiceCommand.contact,
      owner: postInvoiceCommand.owner,
      sender: postInvoiceCommand.sender,
      buyer: {
        name: postInvoiceCommand.buyer.name,
        address: postInvoiceCommand.buyer.address,
      },
      products: postInvoiceCommand.products,
    })
    await this.invoiceRepository.save(invoice)
    return Promise.resolve()
  }
}

export type PostInvoiceCommand = {
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
