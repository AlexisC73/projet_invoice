import { UserFixture, createUserFixture } from '../../../user/tests/user.fixture'
import { ROLE } from '../../../user/user'
import { InvoiceFixture, createInvoiceFixture } from '../invoice.fixture'
import { invoiceBuilder, productBuilder } from '../invoiceBuilder'

describe('Post Invoice', () => {
  let invoiceFixture: InvoiceFixture
  let userFixture: UserFixture

  beforeEach(() => {
    userFixture = createUserFixture()
    invoiceFixture = createInvoiceFixture({
      userRepository: userFixture.getUserRepository(),
    })
  })

  test('should post new Invoice', async () => {
    userFixture.givenUserIsLoggedIn({ id: 'user-id', role: ROLE.USER })

    await invoiceFixture.whenUserPostInvoice(invoiceBuilder().getProps(), userFixture.getToken())

    invoiceFixture.thenInvoiceShouldBe(invoiceBuilder().withOwner('user-id').build())
  })

  test('should post new Invoice with draft status', async () => {
    userFixture.givenUserIsLoggedIn({ id: 'user-id', role: ROLE.USER })

    await invoiceFixture.whenUserPostInvoice(
      { ...invoiceBuilder().getProps(), saveAsDraft: true },
      userFixture.getToken()
    )

    invoiceFixture.thenInvoiceShouldBe(invoiceBuilder().withStatus('draft').withOwner('user-id').build())
  })

  test('should post new invoice with product', async () => {
    userFixture.givenUserIsLoggedIn({ id: 'user-id', role: ROLE.USER })

    await invoiceFixture.whenUserPostInvoice(
      invoiceBuilder().withProducts([productBuilder().getProps()]).getProps(),
      userFixture.getToken()
    )

    invoiceFixture.thenInvoiceShouldBe(
      invoiceBuilder().withOwner('user-id').withProducts([productBuilder().getProps()]).build()
    )
  })

  describe('Rule: default currency must be USD', () => {
    test('should post a new invoice with USD when no currency provided', async () => {
      userFixture.givenUserIsLoggedIn({ id: 'user-id', role: ROLE.USER })

      await invoiceFixture.whenUserPostInvoice(invoiceBuilder().getPropsWithoutCurrency(), userFixture.getToken())

      invoiceFixture.thenInvoiceShouldBe(invoiceBuilder().withOwner('user-id').withCurrency('USD').build())
    })
    test('should use the EUR currency when provided', async () => {
      userFixture.givenUserIsLoggedIn({ id: 'user-id', role: ROLE.USER })

      await invoiceFixture.whenUserPostInvoice(invoiceBuilder().withCurrency('EUR').getProps(), userFixture.getToken())

      invoiceFixture.thenInvoiceShouldBe(invoiceBuilder().withOwner('user-id').withCurrency('EUR').build())
    })
  })

  describe('Rule: new invoice must have pending status', () => {
    test('should post a new Invoice with pending status', async () => {
      userFixture.givenUserIsLoggedIn({ id: 'user-id', role: ROLE.USER })

      await invoiceFixture.whenUserPostInvoice(invoiceBuilder().withStatus('paid').getProps(), userFixture.getToken())

      invoiceFixture.thenInvoiceShouldBe(invoiceBuilder().withOwner('user-id').withStatus('pending').build())
    })
  })
})
