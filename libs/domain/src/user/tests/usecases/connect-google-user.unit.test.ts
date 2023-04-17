import { userBuilder } from '../userBuilder'
import { UserFixture, createUserFixture } from '../user.fixture'

describe('user connect with google account', () => {
  let fixture: UserFixture

  beforeEach(() => {
    fixture = createUserFixture()
  })

  test('should connect user with google account', async () => {
    fixture.givenUserExist([
      userBuilder()
        .withLinkedAccounts({ google: { id: 'google-id' } })
        .withId('test-id')
        .buildGoogleUser(),
    ])
    await fixture.whenUserConnectWithGoogle({ googleId: 'google-id' })
    fixture.thenConnectedTokenShouldBe({ id: 'test-id', role: 100 })
  })
})
