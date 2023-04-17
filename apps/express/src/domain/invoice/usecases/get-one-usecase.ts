import { TokenService } from '../../token/token.service'
import { UserRepository } from '../../user/user.repository'
import { Invoice, Errors } from '@invoice/shared'
import { InvoiceRepository } from './invoice.repository'

const { NotFoundError, RoleError } = Errors

export class GetOneInvoiceUsecase {
  constructor(
    private readonly invoiceRepository: InvoiceRepository,
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService
  ) {}

  async handle({ id, token }: GetOneInvoiceCommand): Promise<Invoice['data']> {
    const fund = await this.invoiceRepository.findById(id)
    const currentUser = this.tokenService.decode(token)
    const user = await this.userRepository.findOneById(currentUser.id)

    if (!user) {
      throw new NotFoundError('User not found')
    }
    if (!fund) {
      throw new NotFoundError('Invoice not found')
    }

    if (fund.owner !== user.id && !user.haveModeratorRole) {
      throw new RoleError('You do not have permission to access this resource.')
    }
    return fund.data
  }
}

export type GetOneInvoiceCommand = {
  id: string
  token: string
}
