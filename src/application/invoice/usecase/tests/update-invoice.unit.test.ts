import { Invoice } from '../../../../domain/invoice'
import { invoiceBuilder } from '../../../../domain/invoice/tests/invoiceBuilder'
import { NotFoundError } from '../../../errors'
import { InvoiceFixture, createInvoiceFixture } from './invoice.fixture'

describe('Update Invoice', () => {
  let fixture: InvoiceFixture

  beforeEach(() => {
    fixture = createInvoiceFixture()
  })

  test('should update an existing invoice', async () => {
    const existingInvoice = invoiceBuilder().withId('test-id').getProps()

    fixture.givenInvoiceExists(Invoice.fromData(existingInvoice))

    await fixture.whenUserUpdateInvoice({
      ...existingInvoice,
      contact: 'new contact',
    })

    fixture.thenInvoiceShouldBe(Invoice.fromData({ ...existingInvoice, contact: 'new contact' }))
  })

  test('should keep current currency if not defined in command', async () => {
    const data = invoiceBuilder().withId('test-id').getProps()

    fixture.givenInvoiceExists(Invoice.fromData(data))

    await fixture.whenUserUpdateInvoice({
      ...data,
      currency: undefined,
    })

    fixture.thenInvoiceShouldBe(Invoice.fromData(data))
  })

  test('should update usd to eur', async () => {
    const data = invoiceBuilder().withId('test-id').withCurrency('USD').getProps()

    fixture.givenInvoiceExists(Invoice.fromData(data))

    await fixture.whenUserUpdateInvoice({
      ...data,
      currency: 'EUR',
    })

    fixture.thenInvoiceShouldBe(Invoice.fromData({ ...data, currency: 'EUR' }))
  })

  test('should throw if invoice not exists', async () => {
    const data = invoiceBuilder().withId('test-id').getProps()

    fixture.givenInvoiceExists(Invoice.fromData(data))

    await fixture.whenUserUpdateInvoice({
      ...data,
      currency: 'EUR',
      id: 'not-exists',
    })

    fixture.thenErrorShouldBe(NotFoundError)
  })
})
