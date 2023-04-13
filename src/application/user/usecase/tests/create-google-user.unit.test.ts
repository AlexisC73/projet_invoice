import { userBuilder } from '../../../../domain/user/tests/userBuilder'
import { UserFixture, createUserFixture } from './user.fixture'

describe('create google user', () => {
  let userFixture: UserFixture

  beforeEach(() => {
    userFixture = createUserFixture()
  })

  test("should create a user with google's id", async () => {
    await userFixture.whenUserSignupWithGoogle({ id: 'test-id', googleId: 'google-id' })

    userFixture.thenUserShouldBe(
      userBuilder()
        .withId('test-id')
        .withLinkedAccounts({ google: { id: 'google-id' } })
        .buildGoogleUser()
    )
  })
})
