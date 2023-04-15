import { LinkedAccounts, User } from '..'

export const userBuilder = ({
  id = 'test-id',
  email = 'jean@test.fr',
  password = 'secret-password',
  role = 100,
  linkedAccounts = {
    google: {
      id: 'google-id',
    },
  },
}: { id?: string; email?: string; password?: string; role?: number; linkedAccounts?: LinkedAccounts } = {}) => {
  const props = { id, email, password, linkedAccounts }
  return {
    withId: (id: string) => userBuilder({ ...props, id }),
    withEmail: (email: string) => userBuilder({ ...props, email }),
    withPassword: (password: string) => userBuilder({ ...props, password }),
    withRole: (role: number) => userBuilder({ ...props, role }),
    withLinkedAccounts: (linkedAccounts: LinkedAccounts) => userBuilder({ ...props, linkedAccounts }),
    buildEmailPasswordUser: () => User.fromEmailPassword(id, email, password, role),
    buildGoogleUser: () => User.fromGoogle(id, linkedAccounts.google.id, role, email),
  }
}
