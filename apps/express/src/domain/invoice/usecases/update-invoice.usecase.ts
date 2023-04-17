import { NotFoundError, RoleError } from '@invoice/shared/dist/domain/errors'
import { TokenService } from '../../token/token.service'
import { UserRepository } from '../../user/user.repository'
import { InvoiceRepository } from '../invoice.repository'
import { Invoice } from '@invoice/shared/dist/domain/invoice'
import { Address } from '@invoice/shared/dist/domain/address'
import { Product } from '@invoice/shared/dist/domain/product'

export class UpdateInvoiceUsecase {
  constructor(
    private invoiceRepository: InvoiceRepository,
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService
  ) {}

  async handle({ invoiceToUpdate, token }: UpdateInvoiceCommand): Promise<void> {
    const currentUser = this.tokenService.decode(token)
    const user = await this.userRepository.findOneById(currentUser.id)

    if (!user) throw new NotFoundError('User does not exists')
    const invoice = await this.invoiceRepository.findById(invoiceToUpdate.id)
    if (!invoice) throw new NotFoundError('Invoice does not exists')

    if (invoice.owner !== user.id && !user.haveModeratorRole)
      throw new RoleError('You do not have permission to access this resource.')

    const { date, dueDate, description, currency, contact, sender, buyer, products } = invoiceToUpdate
    const updatedInvoice = Invoice.fromData({
      ...invoice.data,
      date: date ?? invoice.date,
      dueDate: dueDate ?? invoice.dueDate,
      description: description ?? invoice.description,
      currency: currency ?? invoice.currency,
      contact: contact ?? invoice.contact,
      sender: sender ?? invoice.sender,
      buyer: buyer ?? invoice.buyer,
      products: products ?? invoice.products,
    })
    await this.invoiceRepository.save(updatedInvoice)
  }
}

export type UpdateInvoiceCommand = {
  invoiceToUpdate: {
    id: string
    date?: string
    dueDate?: string
    description?: string
    currency?: string
    contact?: string
    sender?: Address['data']
    buyer?: {
      name: string
      address: Address['data']
    }
    products?: Product['data'][]
  }
  token: string
}
