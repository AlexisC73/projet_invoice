import { RoleError } from '../../../errors'
import { invoiceBuilder } from '../../tests/invoiceBuilder'
import {
  UserFixture,
  createUserFixture,
} from '../../../user/tests/user.fixture'
import { userBuilder } from '../../../user/tests/userBuilder'
import { ROLE } from '../../../user'
import { InvoiceFixture, createInvoiceFixture } from '../invoice.fixture'

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
    userFixture.givenUserExist([
      userBuilder().withId('test-id').withRole(ROLE.USER).buildGoogleUser(),
    ])

    userFixture.givenUserIsLoggedIn({ id: 'test-id', role: ROLE.USER })

    invoiceFixture.givenInvoiceExists([
      invoiceBuilder().withId('test-invoice-1').build(),
      invoiceBuilder().withOwner('test-id').withId('test-invoice-2').build(),
      invoiceBuilder().withId('test-invoice-3').build(),
    ])

    const fundInvoice = await invoiceFixture.whenGetOneInvoice({
      id: 'test-invoice-2',
      token: userFixture.getToken(),
    })

    expect(fundInvoice).toEqual(
      invoiceBuilder().withOwner('test-id').withId('test-invoice-2').build()
        .data
    )
  })

  test('should thrown error if user do not own this invoice and is not moderator', async () => {
    userFixture.givenUserExist([
      userBuilder().withId('test-id').withRole(ROLE.USER).buildGoogleUser(),
    ])

    userFixture.givenUserIsLoggedIn({ id: 'test-id', role: ROLE.USER })

    invoiceFixture.givenInvoiceExists([
      invoiceBuilder().withId('test-invoice-1').build(),
      invoiceBuilder().withId('test-invoice-2').build(),
      invoiceBuilder().withId('test-invoice-3').build(),
    ])

    await invoiceFixture.whenGetOneInvoice({
      id: 'test-invoice-2',
      token: userFixture.getToken(),
    })

    invoiceFixture.thenErrorShouldBe(RoleError)
  })

  test('should return invoices if moderator try access not own invoice', async () => {
    userFixture.givenUserExist([
      userBuilder()
        .withId('test-id')
        .withRole(ROLE.MODERATOR)
        .buildGoogleUser(),
    ])

    userFixture.givenUserIsLoggedIn({ id: 'test-id', role: ROLE.MODERATOR })

    invoiceFixture.givenInvoiceExists([
      invoiceBuilder().withOwner('not me').withId('test-invoice-1').build(),
      invoiceBuilder().withOwner('not me').withId('test-invoice-2').build(),
      invoiceBuilder().withOwner('not me').withId('test-invoice-3').build(),
    ])

    const fundInvoice = await invoiceFixture.whenGetOneInvoice({
      id: 'test-invoice-2',
      token: userFixture.getToken(),
    })

    expect(fundInvoice).toEqual(
      invoiceBuilder().withOwner('not me').withId('test-invoice-2').build().data
    )
  })

  test('should return invoices if admin try access not own invoice', async () => {
    userFixture.givenUserExist([
      userBuilder().withId('test-id').withRole(ROLE.ADMIN).buildGoogleUser(),
    ])

    userFixture.givenUserIsLoggedIn({ id: 'test-id', role: ROLE.ADMIN })

    invoiceFixture.givenInvoiceExists([
      invoiceBuilder().withOwner('not me').withId('test-invoice-1').build(),
      invoiceBuilder().withOwner('not me').withId('test-invoice-2').build(),
      invoiceBuilder().withOwner('not me').withId('test-invoice-3').build(),
    ])

    const fundInvoice = await invoiceFixture.whenGetOneInvoice({
      id: 'test-invoice-2',
      token: userFixture.getToken(),
    })

    expect(fundInvoice).toEqual(
      invoiceBuilder().withOwner('not me').withId('test-invoice-2').build().data
    )
  })
})
