import { Invoice } from '../../../../domain/invoice'
import { InMemoryInvoiceRepository } from '../../../../infrastructure/in-memory.invoice.repository'
import { InMemoryUserRepository } from '../../../../infrastructure/in-memory.user.repository'
import { JWTTokenService } from '../../../../infrastructure/jwt-token-service'
import { DeleteInvoiceCommand, DeleteInvoiceUsecase } from '../delete-invoice.usecase'
import { GetAllInvoicesCommand, GetAllInvoicesUsecase } from '../get-all-invoices.usecase'
import { GetOneInvoiceCommand, GetOneInvoiceUsecase } from '../get-one-usecase'
import { PostInvoiceCommand, PostInvoiceUsecase } from '../post-invoice.usecase'
import { UpdateInvoiceCommand, UpdateInvoiceUsecase } from '../update-invoice.usecase'
import { UpdateInvoiceStatusUsecase, UpdateStatusCommand } from '../update-status.usecase'

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
  const updateInvoiceUsecase = new UpdateInvoiceUsecase(invoiceRepository, userRepository, tokenService)
  const deleteInvoiceUsecase = new DeleteInvoiceUsecase(invoiceRepository)
  const updateInvoiceStatusUsecase = new UpdateInvoiceStatusUsecase(invoiceRepository, userRepository, tokenService)

  const getAllInvoicesUsecase = new GetAllInvoicesUsecase(invoiceRepository, tokenService, userRepository)
  const getOneInvoiceUsecase = new GetOneInvoiceUsecase(invoiceRepository, userRepository, tokenService)

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
    whenUpdateStatus: async (arg: UpdateStatusCommand) => {
      try {
        await updateInvoiceStatusUsecase.handle(arg)
      } catch (error: any) {
        thrownError = error
      }
    },
    whenGetAllInvoices: async ({ token, onlyOwned }: GetAllInvoicesCommand) => {
      try {
        return await getAllInvoicesUsecase.handle({ token, onlyOwned })
      } catch (error: any) {
        thrownError = error
      }
    },
    whenGetOneInvoice: async (arg: GetOneInvoiceCommand) => {
      try {
        return await getOneInvoiceUsecase.handle(arg)
      } catch (err: any) {
        thrownError = err
      }
    },
    whenGetOwnedInvoices: async (params: GetAllInvoicesCommand) => {
      try {
        return await getAllInvoicesUsecase.handle(params)
      } catch (error: any) {
        thrownError = error
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
      const savedInvoice = await invoiceRepository.findById(id)
      expect(savedInvoice).toBeUndefined()
    },
  }
}

export type InvoiceFixture = ReturnType<typeof createInvoiceFixture>
