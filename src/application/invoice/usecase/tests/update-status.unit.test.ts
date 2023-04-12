import { invoiceBuilder } from '../../../../domain/invoice/tests/invoiceBuilder'
import { InMemoryInvoiceRepository } from '../../../../infrastructure/in-memory.invoice.repository'
import { InvoiceFixture, createInvoiceFixture } from './invoice.fixture'

describe('Update invoice status', () => {
  let fixture: InvoiceFixture

  beforeEach(() => {
    fixture = createInvoiceFixture()
  })
  test('should update the invoice status', async () => {
    const invoice = invoiceBuilder().withStatus('pending')

    const invoiceRepository = new InMemoryInvoiceRepository()
    fixture.givenInvoiceExists(invoice.build())

    await fixture.whenUpdateStatus(invoice.getProps().id, 'paid')

    fixture.thenInvoiceShouldBe(invoice.withStatus('paid').build())
  })
})
