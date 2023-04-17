import { Token } from '../../token/token'
import { TokenService } from '../../token/token.service'

export class StubTokenService implements TokenService {
  createConnectToken(payload: Token): string {
    const token = JSON.stringify(payload)
    return token
  }

  verifyConnectToken(token: string): Token {
    const decoded = JSON.parse(token)
    return decoded
  }

  decode(token: string): Token {
    const decoded = JSON.parse(token)
    return decoded
  }
}
