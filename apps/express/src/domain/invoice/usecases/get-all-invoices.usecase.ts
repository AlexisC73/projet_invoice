
import { TokenService } from '../../token/token.service'
import { NotFoundError, RoleError } from "../../errors"
import { UserRepository } from "../../user/user.repository"
import { Invoice } from "../invoice"
import { InvoiceRepository } from "./invoice.repository"
import { Token } from '../../token/token'

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
      throw new NotFoundError('There is a problem with your token. Please log in again.')
    }
    if (onlyOwned) {
      const invoices = await this.invoiceRepository.getAllByUserId(user.id)
      return invoices.map(invoice => invoice.data)
    }
    if (!user.haveModeratorRole) {
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
