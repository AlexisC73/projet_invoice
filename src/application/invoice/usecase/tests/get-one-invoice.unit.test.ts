import { invoiceBuilder } from '../../../../domain/invoice/tests/invoiceBuilder'
import { InvoiceFixture, createInvoiceFixture } from './invoice.fixture'

describe('get all invoices', () => {
  let fixture: InvoiceFixture

  beforeEach(() => {
    fixture = createInvoiceFixture()
  })

  test('should return all invoices', async () => {
    const invoices = [
      invoiceBuilder().build(),
      invoiceBuilder().withId('test-2').build(),
      invoiceBuilder().withId('test-3').build(),
    ]

    fixture.givenInvoiceExists(invoices)

    const fundInvoice = await fixture.whenGetOneInvoice('test-2')

    expect(fundInvoice).toEqual(invoiceBuilder().withId('test-2').build().data)
  })
})
