import { NotFoundError, RoleError } from "../../../errors"
import { UserFixture, createUserFixture } from "../../../user/tests/user.fixture"
import { userBuilder } from "../../../user/tests/userBuilder"
import { ROLE } from "../../../user/user"
import { Invoice } from "../../invoice"
import { InvoiceFixture, createInvoiceFixture } from "../invoice.fixture"
import { invoiceBuilder } from "../invoiceBuilder"


describe('Update Invoice', () => {
  let invoiceFixture: InvoiceFixture
  let userFixture: UserFixture

  beforeEach(() => {
    userFixture = createUserFixture()
    invoiceFixture = createInvoiceFixture({
      userRepository: userFixture.getUserRepository(),
    })
  })

  test('should update an existing invoice with the given argument', async () => {
    const invoices = [
      invoiceBuilder().build(),
      invoiceBuilder()
        .withOwner('test-id')
        .withDescription('desc-test')
        .withContact('old contact')
        .withId('invoice-test')
        .build(),
      invoiceBuilder().withId('test-3').build(),
    ]

    const invoiceToUpdate = invoices.find(invoice => invoice.id === 'invoice-test').data

    userFixture.givenUserExist([userBuilder().withId('test-id').withRole(ROLE.USER).buildGoogleUser()])

    userFixture.givenUserIsLoggedIn({ id: 'test-id', role: ROLE.USER })

    invoiceFixture.givenInvoiceExists(invoices)

    await invoiceFixture.whenUserUpdateInvoice({
      invoiceToUpdate: {
        id: invoiceToUpdate.id,
        contact: 'new contact',
      },
      token: userFixture.getToken(),
    })

    invoiceFixture.thenInvoiceShouldBe(Invoice.fromData({ ...invoiceToUpdate, contact: 'new contact' }))
  })

  test('should not update if no changed in updated invoice', async () => {
    const invoices = [
      invoiceBuilder().build(),
      invoiceBuilder()
        .withOwner('test-id')
        .withDescription('desc-test')
        .withContact('old contact')
        .withId('invoice-test')
        .build(),
      invoiceBuilder().withId('test-3').build(),
    ]

    const invoiceToUpdate = invoices.find(invoice => invoice.id === 'invoice-test').data

    userFixture.givenUserExist([userBuilder().withId('test-id').withRole(ROLE.USER).buildGoogleUser()])

    userFixture.givenUserIsLoggedIn({ id: 'test-id', role: ROLE.USER })

    invoiceFixture.givenInvoiceExists(invoices)

    await invoiceFixture.whenUserUpdateInvoice({
      invoiceToUpdate: {
        id: invoiceToUpdate.id,
      },
      token: userFixture.getToken(),
    })

    invoiceFixture.thenInvoiceShouldBe(Invoice.fromData({ ...invoiceToUpdate }))
  })

  test('should update an existing invoice with the given argument', async () => {
    const invoices = [
      invoiceBuilder().build(),
      invoiceBuilder()
        .withOwner('test-id')
        .withDescription('desc-test')
        .withCurrency('USD')
        .withId('invoice-test')
        .build(),
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
      invoiceBuilder()
        .withOwner('test-id')
        .withDescription('desc-test')
        .withContact('old contact')
        .withId('invoice-test')
        .build(),
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
      invoiceBuilder()
        .withOwner('not-owner')
        .withDescription('desc-test')
        .withContact('old contact')
        .withId('invoice-test')
        .build(),
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
      invoiceBuilder()
        .withOwner('not-owner')
        .withDescription('desc-test')
        .withContact('old contact')
        .withId('invoice-test')
        .build(),
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
      invoiceBuilder()
        .withOwner('not-owner')
        .withDescription('desc-test')
        .withContact('old contact')
        .withId('invoice-test')
        .build(),
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
