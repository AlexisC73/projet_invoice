import { Invoice } from '../../../../domain/invoice'
import { InMemoryInvoiceRepository } from '../../../../infrastructure/in-memory.invoice.repository'
import { DeleteInvoiceCommand, DeleteInvoiceUsecase } from '../delete-invoice.usecase'
import { PostInvoiceCommand, PostInvoiceUsecase } from '../post-invoice.usecase'
import { UpdateInvoiceCommand, UpdateInvoiceUsecase } from '../update-invoice.usecase'

export const createInvoiceFixture = () => {
  const invoiceRepository = new InMemoryInvoiceRepository()
  const postInvoiceUsecase = new PostInvoiceUsecase(invoiceRepository)
  const updateInvoiceUsecase = new UpdateInvoiceUsecase(invoiceRepository)
  const deleteInvoiceUsecase = new DeleteInvoiceUsecase(invoiceRepository)

  let thrownError: Error

  return {
    givenInvoiceExists: (invoice: Invoice) => {
      invoiceRepository.setInvoices(invoice)
    },
    whenUserPostInvoice: async (postInvoiceCommand: PostInvoiceCommand) => {
      try {
        await postInvoiceUsecase.handle(postInvoiceCommand)
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
