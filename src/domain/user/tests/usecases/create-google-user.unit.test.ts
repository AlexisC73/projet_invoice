import { UserFixture, createUserFixture } from '../user.fixture'
import { userBuilder } from '../userBuilder'

describe('create google user', () => {
  let userFixture: UserFixture

  beforeEach(() => {
    userFixture = createUserFixture()
  })

  test("should create a user with google's id", async () => {
    await userFixture.whenUserSignupWithGoogle({ id: 'test-id', googleId: 'google-id', email: 'test@test.fr' })

    userFixture.thenUserShouldBe(
      userBuilder()
        .withId('test-id')
        .withEmail('test@test.fr')
        .withLinkedAccounts({ google: { id: 'google-id' } })
        .buildGoogleUser()
    )
  })
})
