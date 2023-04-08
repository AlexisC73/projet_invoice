import { CurrencyError, InvalidDateError, TooLongError } from '../../../errors'
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

  describe('Rule: description is not required, else must be less or equal to 255 characters', () => {
    test('can post without description provided', async () => {
      await fixture.whenUserPostInvoice(invoiceBuilder().getPropsWithoutDescription())
      fixture.thenInvoiceShouldBeSaved(invoiceBuilder().withDescription('').build())
    })
    test('description must be use when provided', async () => {
      await fixture.whenUserPostInvoice(invoiceBuilder().withDescription('test de description').build().data)
      fixture.thenInvoiceShouldBeSaved(invoiceBuilder().withDescription('test de description').build())
    })
    test('description throw if 256 characters', async () => {
      await fixture.whenUserPostInvoice(invoiceBuilder().withDescription('a'.repeat(256)).getProps())
      fixture.thenErrorShouldBe(TooLongError)
    })

    test('description must not throw if 255 characters', async () => {
      await fixture.whenUserPostInvoice(invoiceBuilder().withDescription('a'.repeat(255)).getProps())
      fixture.thenInvoiceShouldBeSaved(invoiceBuilder().withDescription('a'.repeat(255)).build())
    })
    test('description must not throw if trim result in 255 max characters', async () => {
      await fixture.whenUserPostInvoice(
        invoiceBuilder()
          .withDescription(' ' + 'a'.repeat(255) + ' ')
          .getProps()
      )
      fixture.thenInvoiceShouldBeSaved(invoiceBuilder().withDescription('a'.repeat(255)).build())
    })
  })

  describe('Rule: default currency must be USD', () => {
    test('should post a new invoice with USD when no currency provided', async () => {
      await fixture.whenUserPostInvoice(invoiceBuilder().getPropsWithoutCurrency())
      fixture.thenInvoiceShouldBeSaved(invoiceBuilder().withCurrency('USD').build())
    })
    test('should use the EUR currency when provided', async () => {
      await fixture.whenUserPostInvoice(invoiceBuilder().withCurrency('EUR').build().data)
      fixture.thenInvoiceShouldBeSaved(invoiceBuilder().withCurrency('EUR').build())
    })
    test('should throw if the currency provided is not available or do not exists', async () => {
      await fixture.whenUserPostInvoice(invoiceBuilder().withCurrency('RMP').getProps())
      fixture.thenErrorShouldBe(CurrencyError)
    })
    test('should throw if the currency is still empty after usecase', async () => {
      await fixture.whenUserPostInvoice(invoiceBuilder().withCurrency(' ').getProps())
      fixture.thenErrorShouldBe(CurrencyError)
    })
  })

  describe('Rule: new invoice must have pending status', () => {
    test('should post a new Invoice with pending status', async () => {
      await fixture.whenUserPostInvoice(invoiceBuilder().withStatus('paid').build().data)
      fixture.thenInvoiceShouldBeSaved(invoiceBuilder().withStatus('pending').build())
    })
  })
  describe('Rule: date must be valid', () => {
    test('should throw if date is not valid', async () => {
      await fixture.whenUserPostInvoice(invoiceBuilder().withDate('dadsad').getProps())
      fixture.thenErrorShouldBe(InvalidDateError)
    })
    test('should throw if dueDate is not valid', async () => {
      await fixture.whenUserPostInvoice(invoiceBuilder().withDueDate('dadsad').getProps())
      fixture.thenErrorShouldBe(InvalidDateError)
    })
  })
})
