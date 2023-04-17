import { ROLE } from '../../user/user'
import { InvoiceRepository } from './invoice.repository'
import { UserRepository } from '../../user/user.repository'
import { TokenService } from '../../token/token.service'
import { Errors } from '@invoice/shared'

const { NotFoundError, RoleError } = Errors

export class DeleteInvoiceUsecase {
  constructor(
    private readonly invoiceRepository: InvoiceRepository,
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService
  ) {}

  async handle({ id, token }: DeleteInvoiceCommand): Promise<void> {
    const currentUser = this.tokenService.decode(token)
    const user = await this.userRepository.findOneById(currentUser.id)
    if (!user) throw new NotFoundError('User not found')

    const invoice = await this.invoiceRepository.findById(id)
    if (!invoice) {
      throw new NotFoundError('Invoice not found')
    }

    if (invoice.owner !== user.id && user.role < ROLE.MODERATOR) {
      throw new RoleError('You are not allowed to delete this invoice')
    }

    await this.invoiceRepository.delete(id)
    return Promise.resolve()
  }
}

export type DeleteInvoiceCommand = {
  id: string
  token: string
}
