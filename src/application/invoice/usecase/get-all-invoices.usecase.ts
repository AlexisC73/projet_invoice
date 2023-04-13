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

  async handle(userToken: string): Promise<Invoice['data'][]> {
    const token: Token = this.tokenService.decode(userToken)
    const user = await this.userRepository.findOneById(token.id)
    if (!user || user.role < 200) {
      throw new RoleError("You don't have permission to do this")
    }
    const invoices = await this.invoiceRepository.getAll()
    return invoices.map(invoice => invoice.data)
  }
}
