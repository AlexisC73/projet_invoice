import { InvoiceFixture, createInvoiceFixture } from './invoice.fixture'
import { invoiceBuilder } from './invoiceBuilder'

describe('Post Invoice', () => {
  let fixture: InvoiceFixture

  beforeEach(() => {
    fixture = createInvoiceFixture()
  })

  test('should post a new Invoice', async () => {
    await fixture.whenUserPostInvoice(invoiceBuilder().withId('test-id').build())
    fixture.thenInvoiceShouldBeSaved(invoiceBuilder().withId('test-id').build())
  })
})
