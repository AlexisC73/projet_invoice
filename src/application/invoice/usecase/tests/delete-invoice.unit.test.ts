import { invoiceBuilder } from '../../../../domain/invoice/tests/invoiceBuilder'
import { NotFoundError } from '../../../errors'
import { InvoiceFixture, createInvoiceFixture } from './invoice.fixture'

describe('Delete invoice', () => {
  let fixture: InvoiceFixture

  beforeEach(() => {
    fixture = createInvoiceFixture()
  })
  it('should delete invoice with specified id', async () => {
    fixture.givenInvoiceExists(invoiceBuilder().withId('test-id').build())

    await fixture.whenUserDeleteInvoice({ id: 'test-id' })

    await fixture.thenUserShouldNotExists('test-id')
  })

  it('should throw if invoice not exist', async () => {
    await fixture.whenUserDeleteInvoice({ id: 'test-id' })

    fixture.thenErrorShouldBe(NotFoundError)
  })
})
