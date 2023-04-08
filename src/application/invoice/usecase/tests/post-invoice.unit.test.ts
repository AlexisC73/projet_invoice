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

  describe('Rule: description is not required', () => {
    test('can post without description provided', async () => {
      await fixture.whenUserPostInvoice(invoiceBuilder().withDescription(null).withId('test-id').build())
      fixture.thenInvoiceShouldBeSaved(invoiceBuilder().withDescription('').withId('test-id').build())
    })

    test('description must be use when provided', async () => {
      await fixture.whenUserPostInvoice(
        invoiceBuilder().withDescription('test de description').withId('test-id').build()
      )
      fixture.thenInvoiceShouldBeSaved(
        invoiceBuilder().withDescription('test de description').withId('test-id').build()
      )
    })
  })

  describe('Rule: new invoice must have pending status', () => {
    test('should post a new Invoice with pending status', async () => {
      await fixture.whenUserPostInvoice(invoiceBuilder().withStatus('paid').build())
      fixture.thenInvoiceShouldBeSaved(invoiceBuilder().withStatus('pending').build())
    })
  })
})
