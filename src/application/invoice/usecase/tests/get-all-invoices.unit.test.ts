import { invoiceBuilder } from '../../../../domain/invoice/tests/invoiceBuilder'
import { userBuilder } from '../../../../domain/user/tests/userBuilder'
import { UserFixture, createUserFixture } from '../../../user/usecase/tests/user.fixture'
import { InvoiceFixture, createInvoiceFixture } from './invoice.fixture'

describe('get all invoices', () => {
  let invoiceFixture: InvoiceFixture
  let userFixture: UserFixture

  beforeEach(() => {
    userFixture = createUserFixture()
    invoiceFixture = createInvoiceFixture({
      userRepository: userFixture.getUserRepository(),
    })
  })

  test('should return all invoices', async () => {
    const invoices = [
      invoiceBuilder().build(),
      invoiceBuilder().withId('test-2').build(),
      invoiceBuilder().withId('test-3').build(),
    ]

    userFixture.givenUserExist([userBuilder().withId('test-id').withRole(200).buildGoogleUser()])

    userFixture.givenUserIsLoggedIn({ id: 'test-id', role: 200 })

    invoiceFixture.givenInvoiceExists(invoices)

    const allInvoices = await invoiceFixture.whenGetAllInvoices(userFixture.getToken())

    expect(allInvoices).toEqual(invoices.map(invoice => invoice.data))
  })
})
