export type LinkedAccounts = {
  [key: string]: {
    id: string
  }
}

export class User {
  private constructor(
    private readonly _id: string,
    private readonly _email: string,
    private readonly _password: string | null,
    private readonly _role: number,
    private readonly _linkedAccounts: LinkedAccounts
  ) {}

  get id() {
    return this._id
  }

  get email() {
    return this._email
  }

  get password() {
    return this._password
  }

  get role() {
    return this._role
  }

  get IsBanned() {
    return this.role === ROLE.BAN
  }

  get haveModeratorRole() {
    return this.role >= ROLE.MODERATOR
  }

  get haveAdminRole() {
    return this.role >= ROLE.ADMIN
  }

  get linkedAccounts() {
    return this._linkedAccounts
  }

  get data() {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      role: this.role,
      linkedAccounts: this.linkedAccounts,
    }
  }

  static fromEmailPassword(
    id: string,
    email: string,
    password: string,
    role: number
  ) {
    return new User(id, email, password, role, {})
  }

  static fromGoogle(id: string, googleId: string, role: number, email: string) {
    return new User(id, email, null, role, { google: { id: googleId } })
  }

  static fromData(data: User['data']) {
    return new User(
      data.id,
      data.email,
      data.password,
      data.role,
      data.linkedAccounts
    )
  }
}

export const ROLE = {
  BAN: 0,
  USER: 100,
  MODERATOR: 200,
  ADMIN: 300,
}
