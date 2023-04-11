import { CurrencyError, EmptyError, InvalidDateError, TooLongError } from '../../../errors'
import { InvoiceFixture, createInvoiceFixture } from './invoice.fixture'
import { addressBuilder, invoiceBuilder, productBuilder } from '../../../../domain/invoice/tests/invoiceBuilder'

describe('Post Invoice', () => {
  let fixture: InvoiceFixture

  beforeEach(() => {
    fixture = createInvoiceFixture()
  })

  test('should post new Invoice', async () => {
    await fixture.whenUserPostInvoice(invoiceBuilder().build().data)
    fixture.thenInvoiceShouldBeSaved(invoiceBuilder().build())
  })

  test('should post new invoice with product', async () => {
    await fixture.whenUserPostInvoice(invoiceBuilder().withProducts([productBuilder().getProps()]).getProps())
    fixture.thenInvoiceShouldBeSaved(invoiceBuilder().withProducts([productBuilder().getProps()]).build())
  })

  describe('Rule: default currency must be USD', () => {
    test('should post a new invoice with USD when no currency provided', async () => {
      await fixture.whenUserPostInvoice(invoiceBuilder().getPropsWithoutCurrency())
      fixture.thenInvoiceShouldBeSaved(invoiceBuilder().withCurrency('USD').build())
    })
    test('should use the EUR currency when provided', async () => {
      await fixture.whenUserPostInvoice(invoiceBuilder().withCurrency('EUR').getProps())
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
