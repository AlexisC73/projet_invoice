import { InvoiceFixture, createInvoiceFixture } from './invoice.fixture'
import { invoiceBuilder, productBuilder } from '../../../../domain/invoice/tests/invoiceBuilder'
import { UserFixture, createUserFixture } from '../../../user/usecase/tests/user.fixture'

describe('Post Invoice', () => {
  let invoiceFixture: InvoiceFixture
  let userFixture: UserFixture

  beforeEach(() => {
    invoiceFixture = createInvoiceFixture()
    userFixture = createUserFixture()
  })

  test('should post new Invoice', async () => {
    userFixture.givenUserIsLoggedIn('user-id')

    await invoiceFixture.whenUserPostInvoice(invoiceBuilder().getProps(), userFixture.getToken())

    invoiceFixture.thenInvoiceShouldBe(invoiceBuilder().withOwner('user-id').build())
  })

  test('should post new invoice with product', async () => {
    userFixture.givenUserIsLoggedIn('user-id')

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
      userFixture.givenUserIsLoggedIn('user-id')

      await invoiceFixture.whenUserPostInvoice(invoiceBuilder().getPropsWithoutCurrency(), userFixture.getToken())

      invoiceFixture.thenInvoiceShouldBe(invoiceBuilder().withOwner('user-id').withCurrency('USD').build())
    })
    test('should use the EUR currency when provided', async () => {
      userFixture.givenUserIsLoggedIn('user-id')

      await invoiceFixture.whenUserPostInvoice(invoiceBuilder().withCurrency('EUR').getProps(), userFixture.getToken())

      invoiceFixture.thenInvoiceShouldBe(invoiceBuilder().withOwner('user-id').withCurrency('EUR').build())
    })
  })

  describe('Rule: new invoice must have pending status', () => {
    test('should post a new Invoice with pending status', async () => {
      userFixture.givenUserIsLoggedIn('user-id')

      await invoiceFixture.whenUserPostInvoice(invoiceBuilder().withStatus('paid').getProps(), userFixture.getToken())

      invoiceFixture.thenInvoiceShouldBe(invoiceBuilder().withOwner('user-id').withStatus('pending').build())
    })
  })
})
