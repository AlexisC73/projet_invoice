import { userRepository } from '../../../../config'
import { Invoice } from '../../../../domain/invoice'
import { InMemoryInvoiceRepository } from '../../../../infrastructure/in-memory.invoice.repository'
import { InMemoryUserRepository } from '../../../../infrastructure/in-memory.user.repository'
import { JWTTokenService } from '../../../../infrastructure/jwt-token-service'
import { InvoiceRepository } from '../../../invoice.repository'
import { TokenService } from '../../../token-service'
import { UserRepository } from '../../../user.repository'
import { DeleteInvoiceCommand, DeleteInvoiceUsecase } from '../delete-invoice.usecase'
import { GetAllInvoicesUsecase } from '../get-all-invoices.usecase'
import { GetOneInvoiceUsecase } from '../get-one-usecase'
import { PostInvoiceCommand, PostInvoiceUsecase } from '../post-invoice.usecase'
import { UpdateInvoiceCommand, UpdateInvoiceUsecase } from '../update-invoice.usecase'
import { UpdateInvoiceStatusUsecase } from '../update-status.usecase'

export const createInvoiceFixture = ({
  userRepository = new InMemoryUserRepository(),
  invoiceRepository = new InMemoryInvoiceRepository(),
  tokenService = new JWTTokenService('secret'),
}: {
  userRepository?: any
  tokenService?: any
  invoiceRepository?: any
} = {}) => {
  const postInvoiceUsecase = new PostInvoiceUsecase(invoiceRepository, tokenService)
  const updateInvoiceUsecase = new UpdateInvoiceUsecase(invoiceRepository)
  const deleteInvoiceUsecase = new DeleteInvoiceUsecase(invoiceRepository)
  const updateInvoiceStatusUsecase = new UpdateInvoiceStatusUsecase(invoiceRepository)

  const getAllInvoicesUsecase = new GetAllInvoicesUsecase(invoiceRepository, tokenService, userRepository)
  const getOneInvoiceUsecase = new GetOneInvoiceUsecase(invoiceRepository)

  let thrownError: Error

  return {
    givenInvoiceExists: (invoice: Invoice | Invoice[]) => {
      invoiceRepository.setInvoices(invoice)
    },
    whenUserPostInvoice: async (postInvoiceCommand: PostInvoiceCommand, token: string) => {
      try {
        await postInvoiceUsecase.handle(postInvoiceCommand, token)
      } catch (error: any) {
        thrownError = error
      }
    },
    whenUserUpdateInvoice: async (updateInvoiceCommand: UpdateInvoiceCommand) => {
      try {
        await updateInvoiceUsecase.handle(updateInvoiceCommand)
      } catch (error: any) {
        thrownError = error
      }
    },
    whenUserDeleteInvoice: async (deleteInvoiceCommand: DeleteInvoiceCommand) => {
      try {
        await deleteInvoiceUsecase.handle(deleteInvoiceCommand)
      } catch (error: any) {
        thrownError = error
      }
    },
    whenUpdateStatus: async (id: string, status: string) => {
      try {
        await updateInvoiceStatusUsecase.handle(id, status)
      } catch (error: any) {
        thrownError = error
      }
    },
    whenGetAllInvoices: async (token: string) => {
      try {
        return await getAllInvoicesUsecase.handle(token)
      } catch (error: any) {
        thrownError = error
      }
    },
    whenGetOneInvoice: async (id: string) => {
      try {
        return await getOneInvoiceUsecase.handle(id)
      } catch (err: any) {
        thrownError = err
      }
    },
    thenInvoiceShouldBe: async (expectedInvoice: Invoice) => {
      const savedInvoice = await invoiceRepository.findById(expectedInvoice.id)
      expect(savedInvoice.data).toEqual(expectedInvoice.data)
    },
    thenErrorShouldBe: (expectedError: new () => Error) => {
      expect(thrownError).toBeInstanceOf(expectedError)
    },
    thenUserShouldNotExists: async (id: string) => {
      const savedInvoice = await invoiceRepository.findById(id) //?
      expect(savedInvoice).toBeUndefined()
    },
  }
}

export type InvoiceFixture = ReturnType<typeof createInvoiceFixture>
