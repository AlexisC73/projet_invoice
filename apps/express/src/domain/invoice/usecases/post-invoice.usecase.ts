import { Invoice } from '@invoice/shared/dist/domain/invoice'
import { Token } from '../../token/token'
import { TokenService } from '../../token/token.service'
import { InvoiceRepository } from '../invoice.repository'
import { Address } from '@invoice/shared/dist/domain/address'
import { Product } from '@invoice/shared/dist/domain/product'

export class PostInvoiceUsecase {
  constructor(private invoiceRepository: InvoiceRepository, private readonly tokenService: TokenService) {}

  async handle(postInvoiceCommand: PostInvoiceCommand, token: string): Promise<void> {
    const currentUser: Token = this.tokenService.decode(token)
    const invoice: Invoice = Invoice.fromData({
      id: postInvoiceCommand.id,
      date: postInvoiceCommand.date,
      dueDate: postInvoiceCommand.dueDate,
      description: postInvoiceCommand.description,
      currency: postInvoiceCommand.currency ?? 'USD',
      status: postInvoiceCommand.saveAsDraft ? 'draft' : 'pending',
      contact: postInvoiceCommand.contact,
      owner: currentUser.id,
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
  sender: Address['data']
  buyer: {
    name: string
    address: Address['data']
  }
  products: Product['data'][]
  saveAsDraft?: boolean
}
