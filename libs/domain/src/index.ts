import { PrismaClient } from '@prisma/client'
import { CreateGoogleUserUsecase } from './user/usecases/create-google-user.usecase'
import { ConnectGoogleUserUsecase } from './user/usecases/connect-google-user.usecase'
import { UserRepository } from './user/user.repository'
import { User, LinkedAccounts, ROLE } from './user'
import { DeleteInvoiceUsecase } from './invoice/usecases/delete-invoice.usecase'
import { GetAllInvoicesUsecase } from './invoice/usecases/get-all-invoices.usecase'
import { GetOneInvoiceUsecase } from './invoice/usecases/get-one-usecase'
import {
  PostInvoiceUsecase,
  PostInvoiceCommand,
} from './invoice/usecases/post-invoice.usecase'
import { UpdateInvoiceUsecase } from './invoice/usecases/update-invoice.usecase'
import { UpdateInvoiceStatusUsecase } from './invoice/usecases/update-status.usecase'
import { invoiceBuilder } from './invoice/tests/invoiceBuilder'
import { userBuilder } from './user/tests/userBuilder'
import { InvoiceRepository } from './invoice/invoice.repository'
import { Invoice } from './invoice'
import { Token } from './token/token'
import { TokenService } from './token/token.service'
import { IdGenerator } from './id/id.generator'

export const UserUsecase = {
  CreateGoogleUserUsecase,
  ConnectGoogleUserUsecase,
}

export const InvoiceUsecase = {
  DeleteInvoiceUsecase,
  GetAllInvoicesUsecase,
  GetOneInvoiceUsecase,
  PostInvoiceUsecase,
  UpdateInvoiceUsecase,
  UpdateInvoiceStatusUsecase,
}

export {
  PrismaClient,
  UserRepository,
  User,
  LinkedAccounts,
  ROLE,
  invoiceBuilder,
  userBuilder,
  PostInvoiceCommand,
  InvoiceRepository,
  Invoice,
  Token,
  TokenService,
  IdGenerator,
}
