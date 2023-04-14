import { Invoice } from '../../../../domain/invoice'
import { invoiceBuilder } from '../../../../domain/invoice/tests/invoiceBuilder'
import { ROLE } from '../../../../domain/user'
import { userBuilder } from '../../../../domain/user/tests/userBuilder'
import { NotFoundError, RoleError } from '../../../errors'
import { UserFixture, createUserFixture } from '../../../user/usecase/tests/user.fixture'
import { InvoiceFixture, createInvoiceFixture } from './invoice.fixture'

describe('Update Invoice', () => {
  let invoiceFixture: InvoiceFixture
  let userFixture: UserFixture

  beforeEach(() => {
    userFixture = createUserFixture()
    invoiceFixture = createInvoiceFixture({
      userRepository: userFixture.getUserRepository(),
    })
  })

  test('should update an existing invoice', async () => {
    const invoices = [
      invoiceBuilder().build(),
      invoiceBuilder().withOwner('test-id').withDescription('desc-test').withId('invoice-test').build(),
      invoiceBuilder().withId('test-3').build(),
    ]

    const invoiceToUpdate = invoices.find(invoice => invoice.id === 'invoice-test').data

    userFixture.givenUserExist([userBuilder().withId('test-id').withRole(ROLE.USER).buildGoogleUser()])

    userFixture.givenUserIsLoggedIn({ id: 'test-id', role: ROLE.USER })

    invoiceFixture.givenInvoiceExists(invoices)

    await invoiceFixture.whenUserUpdateInvoice({
      invoiceToUpdate: {
        ...invoiceToUpdate,
        contact: 'new contact',
      },
      token: userFixture.getToken(),
    })

    invoiceFixture.thenInvoiceShouldBe(Invoice.fromData({ ...invoiceToUpdate, contact: 'new contact' }))
  })

  test('should keep current currency if not defined in command', async () => {
    const invoices = [
      invoiceBuilder().build(),
      invoiceBuilder().withOwner('test-id').withDescription('desc-test').withId('invoice-test').build(),
      invoiceBuilder().withId('test-3').build(),
    ]

    const invoiceToUpdate = invoices.find(invoice => invoice.id === 'invoice-test').data

    userFixture.givenUserExist([userBuilder().withId('test-id').withRole(ROLE.USER).buildGoogleUser()])

    userFixture.givenUserIsLoggedIn({ id: 'test-id', role: ROLE.USER })

    invoiceFixture.givenInvoiceExists(invoices)

    await invoiceFixture.whenUserUpdateInvoice({
      invoiceToUpdate: {
        ...invoiceToUpdate,
        currency: undefined,
      },
      token: userFixture.getToken(),
    })

    invoiceFixture.thenInvoiceShouldBe(Invoice.fromData(invoiceToUpdate))
  })

  test('should update usd to eur', async () => {
    const invoices = [
      invoiceBuilder().build(),
      invoiceBuilder().withOwner('test-id').withDescription('desc-test').withId('invoice-test').build(),
      invoiceBuilder().withId('test-3').build(),
    ]

    const invoiceToUpdate = invoices.find(invoice => invoice.id === 'invoice-test').data

    userFixture.givenUserExist([userBuilder().withId('test-id').withRole(ROLE.USER).buildGoogleUser()])

    userFixture.givenUserIsLoggedIn({ id: 'test-id', role: ROLE.USER })

    invoiceFixture.givenInvoiceExists(invoices)

    await invoiceFixture.whenUserUpdateInvoice({
      invoiceToUpdate: {
        ...invoiceToUpdate,
        currency: 'EUR',
      },
      token: userFixture.getToken(),
    })

    invoiceFixture.thenInvoiceShouldBe(Invoice.fromData({ ...invoiceToUpdate, currency: 'EUR' }))
  })

  test('should throw if invoice not exists', async () => {
    const invoices = [
      invoiceBuilder().build(),
      invoiceBuilder().withOwner('test-id').withDescription('desc-test').withId('invoice-test').build(),
      invoiceBuilder().withId('test-3').build(),
    ]

    const invoiceToUpdate = invoiceBuilder().withId('not-exists').getProps()

    userFixture.givenUserExist([userBuilder().withId('test-id').withRole(ROLE.USER).buildGoogleUser()])

    userFixture.givenUserIsLoggedIn({ id: 'test-id', role: ROLE.USER })

    invoiceFixture.givenInvoiceExists(invoices)

    await invoiceFixture.whenUserUpdateInvoice({
      invoiceToUpdate: {
        ...invoiceToUpdate,
        contact: 'new contact',
      },
      token: userFixture.getToken(),
    })

    invoiceFixture.thenErrorShouldBe(NotFoundError)
  })

  test('should throw if user not owner', async () => {
    const invoices = [
      invoiceBuilder().build(),
      invoiceBuilder().withOwner('not-owner').withDescription('desc-test').withId('invoice-test').build(),
      invoiceBuilder().withId('test-3').build(),
    ]

    const invoiceToUpdate = invoices.find(invoice => invoice.id === 'invoice-test').data

    userFixture.givenUserExist([userBuilder().withId('test-id').withRole(ROLE.USER).buildGoogleUser()])

    userFixture.givenUserIsLoggedIn({ id: 'test-id', role: ROLE.USER })

    invoiceFixture.givenInvoiceExists(invoices)

    await invoiceFixture.whenUserUpdateInvoice({
      invoiceToUpdate: {
        ...invoiceToUpdate,
        contact: 'new contact',
      },
      token: userFixture.getToken(),
    })

    invoiceFixture.thenErrorShouldBe(RoleError)
  })

  test('should not throw if moderator not owner', async () => {
    const invoices = [
      invoiceBuilder().build(),
      invoiceBuilder().withOwner('not-owner').withDescription('desc-test').withId('invoice-test').build(),
      invoiceBuilder().withId('test-3').build(),
    ]

    const invoiceToUpdate = invoices.find(invoice => invoice.id === 'invoice-test').data

    userFixture.givenUserExist([userBuilder().withId('test-id').withRole(ROLE.MODERATOR).buildGoogleUser()])

    userFixture.givenUserIsLoggedIn({ id: 'test-id', role: ROLE.MODERATOR })

    invoiceFixture.givenInvoiceExists(invoices)

    await invoiceFixture.whenUserUpdateInvoice({
      invoiceToUpdate: {
        ...invoiceToUpdate,
        contact: 'new contact',
      },
      token: userFixture.getToken(),
    })

    invoiceFixture.thenInvoiceShouldBe(Invoice.fromData({ ...invoiceToUpdate, contact: 'new contact' }))
  })

  test('should not throw if admin not owner', async () => {
    const invoices = [
      invoiceBuilder().build(),
      invoiceBuilder().withOwner('not-owner').withDescription('desc-test').withId('invoice-test').build(),
      invoiceBuilder().withId('test-3').build(),
    ]

    const invoiceToUpdate = invoices.find(invoice => invoice.id === 'invoice-test').data

    userFixture.givenUserExist([userBuilder().withId('test-id').withRole(ROLE.ADMIN).buildGoogleUser()])

    userFixture.givenUserIsLoggedIn({ id: 'test-id', role: ROLE.ADMIN })

    invoiceFixture.givenInvoiceExists(invoices)

    await invoiceFixture.whenUserUpdateInvoice({
      invoiceToUpdate: {
        ...invoiceToUpdate,
        contact: 'new contact',
      },
      token: userFixture.getToken(),
    })

    invoiceFixture.thenInvoiceShouldBe(Invoice.fromData({ ...invoiceToUpdate, contact: 'new contact' }))
  })
})
