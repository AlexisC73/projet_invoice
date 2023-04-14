import { invoiceBuilder } from '../../../../domain/invoice/tests/invoiceBuilder'
import { userBuilder } from '../../../../domain/user/tests/userBuilder'
import { RoleError } from '../../../errors'
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

    invoiceFixture.givenInvoiceExists([
      invoiceBuilder().build(),
      invoiceBuilder().withId('test-2').build(),
      invoiceBuilder().withId('test-3').build(),
    ])

    const allInvoices = await invoiceFixture.whenGetAllInvoices({ token: userFixture.getToken() })

    expect(allInvoices).toEqual(invoices.map(invoice => invoice.data))
  })

  test('should return all invoices', async () => {
    const invoices = [
      invoiceBuilder().build(),
      invoiceBuilder().withId('test-2').build(),
      invoiceBuilder().withId('test-3').build(),
    ]

    userFixture.givenUserExist([userBuilder().withId('test-id').withRole(100).buildGoogleUser()])

    userFixture.givenUserIsLoggedIn({ id: 'test-id', role: 100 })

    invoiceFixture.givenInvoiceExists(invoices)

    const allInvoices = await invoiceFixture.whenGetAllInvoices({ token: userFixture.getToken() })

    invoiceFixture.thenErrorShouldBe(RoleError)
  })

  test('should return all owned invoices only', async () => {
    userFixture.givenUserExist([userBuilder().withId('test-id').withRole(100).buildGoogleUser()])

    userFixture.givenUserIsLoggedIn({ id: 'test-id', role: 100 })

    invoiceFixture.givenInvoiceExists([
      invoiceBuilder().withOwner('test-id').build(),
      invoiceBuilder().withOwner('not-owned').withId('test-2').build(),
      invoiceBuilder().withOwner('test-id').withId('test-3').build(),
    ])

    const allInvoices = await invoiceFixture.whenGetAllInvoices({ token: userFixture.getToken(), onlyOwned: true })

    expect(allInvoices).toEqual([
      invoiceBuilder().withOwner('test-id').build().data,
      invoiceBuilder().withOwner('test-id').withId('test-3').build().data,
    ])
  })
})
