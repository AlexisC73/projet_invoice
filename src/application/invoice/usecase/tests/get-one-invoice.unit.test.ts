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

  test('should return invoices if user own her', async () => {
    userFixture.givenUserExist([userBuilder().withId('test-id').withRole(100).buildGoogleUser()])

    userFixture.givenUserIsLoggedIn({ id: 'test-id', role: 100 })

    invoiceFixture.givenInvoiceExists([
      invoiceBuilder().withId('test-invoice-1').build(),
      invoiceBuilder().withOwner('test-id').withId('test-invoice-2').build(),
      invoiceBuilder().withId('test-invoice-3').build(),
    ])

    const fundInvoice = await invoiceFixture.whenGetOneInvoice({ id: 'test-invoice-2', token: userFixture.getToken() })

    expect(fundInvoice).toEqual(invoiceBuilder().withOwner('test-id').withId('test-invoice-2').build().data)
  })

  test('should thrown error if user do not own this invoice and is not moderator', async () => {
    userFixture.givenUserExist([userBuilder().withId('test-id').withRole(100).buildGoogleUser()])

    userFixture.givenUserIsLoggedIn({ id: 'test-id', role: 100 })

    invoiceFixture.givenInvoiceExists([
      invoiceBuilder().withId('test-invoice-1').build(),
      invoiceBuilder().withId('test-invoice-2').build(),
      invoiceBuilder().withId('test-invoice-3').build(),
    ])

    await invoiceFixture.whenGetOneInvoice({ id: 'test-invoice-2', token: userFixture.getToken() })

    invoiceFixture.thenErrorShouldBe(RoleError)
  })

  test('should return invoices if moderator try access not own invoice', async () => {
    userFixture.givenUserExist([userBuilder().withId('test-id').withRole(200).buildGoogleUser()])

    userFixture.givenUserIsLoggedIn({ id: 'test-id', role: 200 })

    invoiceFixture.givenInvoiceExists([
      invoiceBuilder().withOwner('not me').withId('test-invoice-1').build(),
      invoiceBuilder().withOwner('not me').withId('test-invoice-2').build(),
      invoiceBuilder().withOwner('not me').withId('test-invoice-3').build(),
    ])

    const fundInvoice = await invoiceFixture.whenGetOneInvoice({ id: 'test-invoice-2', token: userFixture.getToken() })

    expect(fundInvoice).toEqual(invoiceBuilder().withOwner('not me').withId('test-invoice-2').build().data)
  })

  test('should return invoices if admin try access not own invoice', async () => {
    userFixture.givenUserExist([userBuilder().withId('test-id').withRole(300).buildGoogleUser()])

    userFixture.givenUserIsLoggedIn({ id: 'test-id', role: 300 })

    invoiceFixture.givenInvoiceExists([
      invoiceBuilder().withOwner('not me').withId('test-invoice-1').build(),
      invoiceBuilder().withOwner('not me').withId('test-invoice-2').build(),
      invoiceBuilder().withOwner('not me').withId('test-invoice-3').build(),
    ])

    const fundInvoice = await invoiceFixture.whenGetOneInvoice({ id: 'test-invoice-2', token: userFixture.getToken() })

    expect(fundInvoice).toEqual(invoiceBuilder().withOwner('not me').withId('test-invoice-2').build().data)
  })
})
