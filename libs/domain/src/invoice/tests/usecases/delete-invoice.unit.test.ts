import { RoleError } from '../../../errors'
import { invoiceBuilder } from '../../tests/invoiceBuilder'
import {
  UserFixture,
  createUserFixture,
} from '../../../user/tests/user.fixture'
import { userBuilder } from '../../../user/tests/userBuilder'
import { ROLE } from '../../../user'
import { InvoiceFixture, createInvoiceFixture } from '../invoice.fixture'

describe('Delete invoice', () => {
  let invoiceFixture: InvoiceFixture
  let userFixture: UserFixture

  beforeEach(() => {
    userFixture = createUserFixture()
    invoiceFixture = createInvoiceFixture({
      userRepository: userFixture.getUserRepository(),
    })
  })
  it('should delete invoice with specified id if owner', async () => {
    userFixture.givenUserExist([
      userBuilder().withId('1').withRole(ROLE.USER).buildGoogleUser(),
    ])
    userFixture.givenUserIsLoggedIn({ id: '1', role: ROLE.USER })

    invoiceFixture.givenInvoiceExists([
      invoiceBuilder().withOwner('1').withId('test-id').build(),
      invoiceBuilder().withOwner('1').withId('test-id-2').build(),
    ])

    await invoiceFixture.whenUserDeleteInvoice({
      id: 'test-id',
      token: userFixture.getToken(),
    })

    await invoiceFixture.thenInvoiceShouldNotExist('test-id')
    await invoiceFixture.thenInvoiceShouldBe(
      invoiceBuilder().withOwner('1').withId('test-id-2').build()
    )
  })

  it('should delete invoice with specified id if moderator', async () => {
    userFixture.givenUserExist([
      userBuilder().withId('1').withRole(ROLE.MODERATOR).buildGoogleUser(),
    ])
    userFixture.givenUserIsLoggedIn({ id: '1', role: ROLE.MODERATOR })

    invoiceFixture.givenInvoiceExists([
      invoiceBuilder().withOwner('2').withId('test-id').build(),
      invoiceBuilder().withOwner('2').withId('test-id-2').build(),
    ])

    await invoiceFixture.whenUserDeleteInvoice({
      id: 'test-id',
      token: userFixture.getToken(),
    })

    await invoiceFixture.thenInvoiceShouldNotExist('test-id')
    await invoiceFixture.thenInvoiceShouldBe(
      invoiceBuilder().withOwner('2').withId('test-id-2').build()
    )
  })

  it('should delete invoice with specified id if admin', async () => {
    userFixture.givenUserExist([
      userBuilder().withId('1').withRole(ROLE.ADMIN).buildGoogleUser(),
    ])
    userFixture.givenUserIsLoggedIn({ id: '1', role: ROLE.ADMIN })

    invoiceFixture.givenInvoiceExists([
      invoiceBuilder().withOwner('2').withId('test-id').build(),
      invoiceBuilder().withOwner('2').withId('test-id-2').build(),
    ])

    await invoiceFixture.whenUserDeleteInvoice({
      id: 'test-id',
      token: userFixture.getToken(),
    })

    await invoiceFixture.thenInvoiceShouldNotExist('test-id')
    await invoiceFixture.thenInvoiceShouldBe(
      invoiceBuilder().withOwner('2').withId('test-id-2').build()
    )
  })

  it('should throw if not owner and role user', async () => {
    userFixture.givenUserExist([
      userBuilder().withId('1').withRole(ROLE.USER).buildGoogleUser(),
    ])
    userFixture.givenUserIsLoggedIn({ id: '1', role: ROLE.USER })

    invoiceFixture.givenInvoiceExists([
      invoiceBuilder().withOwner('2').withId('test-id').build(),
      invoiceBuilder().withOwner('2').withId('test-id-2').build(),
    ])

    await invoiceFixture.whenUserDeleteInvoice({
      id: 'test-id',
      token: userFixture.getToken(),
    })

    await invoiceFixture.thenErrorShouldBe(RoleError)
  })
})
