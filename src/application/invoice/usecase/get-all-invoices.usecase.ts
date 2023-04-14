import { Invoice } from '../../../domain/invoice'
import { RoleError } from '../../errors'
import { InvoiceRepository } from '../../invoice.repository'
import { Token, TokenService } from '../../token-service'
import { UserRepository } from '../../user.repository'

export class GetAllInvoicesUsecase {
  constructor(
    private readonly invoiceRepository: InvoiceRepository,
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository
  ) {}

  async handle({ token, onlyOwned }: GetAllInvoicesCommand): Promise<Invoice['data'][]> {
    const userToken: Token = this.tokenService.decode(token)
    const user = await this.userRepository.findOneById(userToken.id)
    if (!user) {
      throw new RoleError('There is a problem with your token. Please log in again.')
    }
    if (onlyOwned) {
      const invoices = await this.invoiceRepository.getAllByUserId(user.id)
      return invoices.map(invoice => invoice.data)
    }
    if (user.role < 200) {
      throw new RoleError('You do not have permission to access this resource.')
    }
    const invoices = await this.invoiceRepository.getAll()
    return invoices.map(invoice => invoice.data)
  }
}

export type GetAllInvoicesCommand = {
  token: string
  onlyOwned?: boolean
}
