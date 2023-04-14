import { Invoice } from '../../../domain/invoice'
import { ROLE } from '../../../domain/user'
import { NotFoundError, RoleError } from '../../errors'
import { InvoiceRepository } from '../../invoice.repository'
import { TokenService } from '../../token-service'
import { UserRepository } from '../../user.repository'

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
