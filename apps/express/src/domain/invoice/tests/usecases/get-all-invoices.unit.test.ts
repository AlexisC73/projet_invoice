import { RoleError } from '@invoice/shared/src/domain/errors'
import { UserFixture, createUserFixture } from '../../../user/tests/user.fixture'
import { userBuilder } from '../../../user/tests/userBuilder'
import { ROLE } from '../../../user/user'
import { InvoiceFixture, createInvoiceFixture } from '../invoice.fixture'
import { invoiceBuilder } from '@invoice/shared/src/domain/tests/invoice/invoiceBuilder'

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

    userFixture.givenUserExist([userBuilder().withId('test-id').withRole(ROLE.MODERATOR).buildGoogleUser()])

    userFixture.givenUserIsLoggedIn({ id: 'test-id', role: ROLE.MODERATOR })

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

    userFixture.givenUserExist([userBuilder().withId('test-id').withRole(ROLE.USER).buildGoogleUser()])

    userFixture.givenUserIsLoggedIn({ id: 'test-id', role: ROLE.USER })

    invoiceFixture.givenInvoiceExists(invoices)

    const allInvoices = await invoiceFixture.whenGetAllInvoices({ token: userFixture.getToken() })

    invoiceFixture.thenErrorShouldBe(RoleError)
  })

  test('should return all owned invoices only', async () => {
    userFixture.givenUserExist([userBuilder().withId('test-id').withRole(ROLE.USER).buildGoogleUser()])

    userFixture.givenUserIsLoggedIn({ id: 'test-id', role: ROLE.USER })

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
