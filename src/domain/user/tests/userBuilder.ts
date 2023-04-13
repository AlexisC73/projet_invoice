import { LinkedAccounts, User } from '..'

export const userBuilder = ({
  id = 'test-id',
  email = 'jean@test.fr',
  password = 'secret-password',
  linkedAccounts = {},
}: { id?: string; email?: string; password?: string; linkedAccounts?: LinkedAccounts } = {}) => {
  const props = { id, email, password, linkedAccounts }
  return {
    withId: (id: string) => userBuilder({ ...props, id }),
    withEmail: (email: string) => userBuilder({ ...props, email }),
    withPassword: (password: string) => userBuilder({ ...props, password }),
    withLinkedAccounts: (linkedAccounts: LinkedAccounts) => userBuilder({ ...props, linkedAccounts }),
    buildEmailPasswordUser: () => User.fromEmailPassword(id, email, password),
    buildGoogleUser: () => User.fromGoogle(id, linkedAccounts.google.id),
  }
}
