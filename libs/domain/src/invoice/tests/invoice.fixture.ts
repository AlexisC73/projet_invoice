import {
  DeleteInvoiceCommand,
  DeleteInvoiceUsecase,
} from '../usecases/delete-invoice.usecase'
import {
  PostInvoiceCommand,
  PostInvoiceUsecase,
} from '../usecases/post-invoice.usecase'
import {
  UpdateInvoiceCommand,
  UpdateInvoiceUsecase,
} from '../usecases/update-invoice.usecase'
import {
  UpdateInvoiceStatusUsecase,
  UpdateStatusCommand,
} from '../usecases/update-status.usecase'
import {
  GetAllInvoicesCommand,
  GetAllInvoicesUsecase,
} from '../usecases/get-all-invoices.usecase'
import {
  GetOneInvoiceCommand,
  GetOneInvoiceUsecase,
} from '../usecases/get-one-usecase'
import { Invoice } from '..'
import { InMemoryUserRepository } from '../../user/tests/in-memory.user.repository'
import { InMemoryInvoiceRepository } from '../../user/tests/in-memory.invoice.repository'
import { StubTokenService } from '../../user/tests/stub-token-service'

export const createInvoiceFixture = ({
  userRepository = new InMemoryUserRepository(),
  invoiceRepository = new InMemoryInvoiceRepository(),
  tokenService = new StubTokenService(),
}: {
  userRepository?: any
  tokenService?: any
  invoiceRepository?: any
} = {}) => {
  const postInvoiceUsecase = new PostInvoiceUsecase(
    invoiceRepository,
    tokenService
  )
  const updateInvoiceUsecase = new UpdateInvoiceUsecase(
    invoiceRepository,
    userRepository,
    tokenService
  )
  const deleteInvoiceUsecase = new DeleteInvoiceUsecase(
    invoiceRepository,
    userRepository,
    tokenService
  )
  const updateInvoiceStatusUsecase = new UpdateInvoiceStatusUsecase(
    invoiceRepository,
    userRepository,
    tokenService
  )

  const getAllInvoicesUsecase = new GetAllInvoicesUsecase(
    invoiceRepository,
    tokenService,
    userRepository
  )
  const getOneInvoiceUsecase = new GetOneInvoiceUsecase(
    invoiceRepository,
    userRepository,
    tokenService
  )

  let thrownError: Error

  return {
    givenInvoiceExists: (invoice: Invoice | Invoice[]) => {
      invoiceRepository.setInvoices(invoice)
    },
    whenUserPostInvoice: async (
      postInvoiceCommand: PostInvoiceCommand,
      token: string
    ) => {
      try {
        await postInvoiceUsecase.handle(postInvoiceCommand, token)
      } catch (error: any) {
        thrownError = error
      }
    },
    whenUserUpdateInvoice: async (
      updateInvoiceCommand: UpdateInvoiceCommand
    ) => {
      try {
        await updateInvoiceUsecase.handle(updateInvoiceCommand)
      } catch (error: any) {
        thrownError = error
      }
    },
    whenUserDeleteInvoice: async (
      deleteInvoiceCommand: DeleteInvoiceCommand
    ) => {
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
    thenInvoiceShouldNotExist: async (id: string) => {
      const savedInvoice = await invoiceRepository.findById(id)
      expect(savedInvoice).toBe(null)
    },
  }
}

export type InvoiceFixture = ReturnType<typeof createInvoiceFixture>
