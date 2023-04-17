import { RoleError } from '@invoice/shared/src/domain/errors'
import { UserFixture, createUserFixture } from '../../../user/tests/user.fixture'
import { userBuilder } from '../../../user/tests/userBuilder'
import { ROLE } from '../../../user/user'
import { InvoiceFixture, createInvoiceFixture } from '../invoice.fixture'
import { invoiceBuilder } from '@invoice/shared/src/domain/tests/invoice/invoiceBuilder'

describe('Update invoice status', () => {
  let userFixture: UserFixture
  let fixture: InvoiceFixture

  beforeEach(() => {
    userFixture = createUserFixture()
    fixture = createInvoiceFixture({
      userRepository: userFixture.getUserRepository(),
    })
  })
  test('should update the invoice status if owner', async () => {
    userFixture.givenUserExist([userBuilder().withId('1').withRole(ROLE.USER).buildGoogleUser()])
    userFixture.givenUserIsLoggedIn({ id: '1', role: ROLE.USER })

    const invoice = invoiceBuilder().withOwner('1').withStatus('pending')
    fixture.givenInvoiceExists(invoice.build())

    await fixture.whenUpdateStatus({
      invoiceToUpdate: { id: invoice.getProps().id, status: 'paid' },
      token: userFixture.getToken(),
    })

    fixture.thenInvoiceShouldBe(invoice.withStatus('paid').build())
  })

  test('should update the invoice if moderator', async () => {
    userFixture.givenUserExist([userBuilder().withId('1').withRole(ROLE.MODERATOR).buildGoogleUser()])
    userFixture.givenUserIsLoggedIn({ id: '1', role: ROLE.MODERATOR })

    const invoice = invoiceBuilder().withOwner('2').withStatus('pending')
    fixture.givenInvoiceExists(invoice.build())

    await fixture.whenUpdateStatus({
      invoiceToUpdate: { id: invoice.getProps().id, status: 'paid' },
      token: userFixture.getToken(),
    })

    fixture.thenInvoiceShouldBe(invoice.withStatus('paid').build())
  })

  test('should update the invoice if moderator', async () => {
    userFixture.givenUserExist([userBuilder().withId('1').withRole(ROLE.ADMIN).buildGoogleUser()])
    userFixture.givenUserIsLoggedIn({ id: '1', role: ROLE.ADMIN })

    const invoice = invoiceBuilder().withOwner('2').withStatus('pending')
    fixture.givenInvoiceExists(invoice.build())

    await fixture.whenUpdateStatus({
      invoiceToUpdate: { id: invoice.getProps().id, status: 'paid' },
      token: userFixture.getToken(),
    })

    fixture.thenInvoiceShouldBe(invoice.withStatus('paid').build())
  })

  test('should throw error if not admin and not owner the invoice if moderator', async () => {
    userFixture.givenUserExist([userBuilder().withId('1').withRole(ROLE.USER).buildGoogleUser()])
    userFixture.givenUserIsLoggedIn({ id: '1', role: ROLE.USER })

    const invoice = invoiceBuilder().withOwner('2').withStatus('pending')
    fixture.givenInvoiceExists(invoice.build())

    await fixture.whenUpdateStatus({
      invoiceToUpdate: { id: invoice.getProps().id, status: 'paid' },
      token: userFixture.getToken(),
    })

    fixture.thenErrorShouldBe(RoleError)
  })
})
