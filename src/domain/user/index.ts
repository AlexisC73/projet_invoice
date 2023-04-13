export type LinkedAccounts = {
  [key: string]: {
    id: string
  }
}

export class User {
  private constructor(
    private readonly _id: string,
    private readonly _email: string,
    private readonly _password: string,
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

  get linkedAccounts() {
    return this._linkedAccounts
  }

  get data() {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      linkedAccounts: this.linkedAccounts,
    }
  }

  static fromEmailPassword(id: string, email: string, password: string) {
    return new User(id, email, password, {})
  }

  static fromGoogle(id: string, googleId: string) {
    return new User(id, null, null, { google: { id: googleId } })
  }

  static fromData(data: User['data']) {
    return new User(data.id, data.email, data.password, data.linkedAccounts)
  }
}
