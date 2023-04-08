import { InvoiceFixture, createInvoiceFixture } from './invoice.fixture'
import { invoiceBuilder } from './invoiceBuilder'

describe('Post Invoice', () => {
  let fixture: InvoiceFixture

  beforeEach(() => {
    fixture = createInvoiceFixture()
  })

  test('should post a new Invoice', async () => {
    await fixture.whenUserPostInvoice(invoiceBuilder().build().data)
    fixture.thenInvoiceShouldBeSaved(invoiceBuilder().build())
  })

  describe('Rule: description is not required', () => {
    test('can post without description provided', async () => {
      await fixture.whenUserPostInvoice(invoiceBuilder().buildWithoutDescription().data)
      fixture.thenInvoiceShouldBeSaved(invoiceBuilder().withDescription('').build())
    })

    test('description must be use when provided', async () => {
      await fixture.whenUserPostInvoice(invoiceBuilder().withDescription('test de description').build().data)
      fixture.thenInvoiceShouldBeSaved(invoiceBuilder().withDescription('test de description').build())
    })
  })

  describe('Rule: default currency must be USD', () => {
    test('should post a new invoice with USD when no currency provided', async () => {
      await fixture.whenUserPostInvoice(invoiceBuilder().buildWithoutCurrency().data)
      fixture.thenInvoiceShouldBeSaved(invoiceBuilder().withCurrency('USD').build())
    })

    test('should use the EUR currency when provided', async () => {
      await fixture.whenUserPostInvoice(invoiceBuilder().withCurrency('EUR').build().data)
      fixture.thenInvoiceShouldBeSaved(invoiceBuilder().withCurrency('EUR').build())
    })
  })

  describe('Rule: new invoice must have pending status', () => {
    test('should post a new Invoice with pending status', async () => {
      await fixture.whenUserPostInvoice(invoiceBuilder().withStatus('paid').build().data)
      fixture.thenInvoiceShouldBeSaved(invoiceBuilder().withStatus('pending').build())
    })
  })
})
