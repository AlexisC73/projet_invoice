import { NotFoundError, RoleError } from '../../errors'
import { TokenService } from '../../token/token.service'
import { ROLE } from '../../user/user'
import { UserRepository } from '../../user/user.repository'
import { Invoice } from '../invoice'
import { InvoiceRepository } from './invoice.repository'

export class UpdateInvoiceStatusUsecase {
  constructor(
    private invoiceRepository: InvoiceRepository,
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService
  ) {}

  async handle({ invoiceToUpdate, token }: UpdateStatusCommand) {
    const currentUser = this.tokenService.decode(token)
    const user = await this.userRepository.findOneById(currentUser.id)
    if (!user) throw new NotFoundError('User not found')

    const invoice = await this.invoiceRepository.findById(invoiceToUpdate.id)
    if (!invoice) {
      throw new NotFoundError('Invoice not found')
    }

    if (invoice.owner !== user.id && user.role < ROLE.MODERATOR) {
      throw new RoleError('You are not allowed to update this invoice')
    }

    const updatedInvoice = Invoice.fromData({ ...invoice.data, status: invoiceToUpdate.status })
    await this.invoiceRepository.save(updatedInvoice)
    return Promise.resolve()
  }
}

export type UpdateStatusCommand = {
  invoiceToUpdate: {
    id: string
    status: string
  }
  token: string
}
