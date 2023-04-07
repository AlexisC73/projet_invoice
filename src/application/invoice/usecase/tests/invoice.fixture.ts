import { Invoice } from '../../../../domain/invoice'
import { InMemoryInvoiceRepository } from '../../../../infrastructure/in-memory.invoice.repository'
import { PostInvoiceCommand, PostInvoiceUsecase } from '../post-invoice.usecase'

export const createInvoiceFixture = () => {
  const invoiceRepository = new InMemoryInvoiceRepository()
  const postInvoiceUsecase = new PostInvoiceUsecase(invoiceRepository)

  return {
    whenUserPostInvoice: async (postInvoiceCommand: PostInvoiceCommand) => {
      await postInvoiceUsecase.handle(postInvoiceCommand)
    },
    thenInvoiceShouldBeSaved: async (expectedInvoice: Invoice) => {
      const savedInvoice = await invoiceRepository.find(expectedInvoice.id)
      expect(savedInvoice.data).toEqual(expectedInvoice.data)
    },
  }
}

export type InvoiceFixture = ReturnType<typeof createInvoiceFixture>
