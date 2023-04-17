import * as jwt from 'jsonwebtoken'
import { TokenService } from '../domain/token/token.service'
import { Token } from '../domain/token/token'

export class JWTTokenService implements TokenService {
  constructor(private readonly secretKey: string) {}
  createConnectToken(payload: Token): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: '24h' })
  }

  verifyConnectToken(token: string): Token {
    const decoded = jwt.verify(token, this.secretKey) as Token
    return decoded
  }

  decode(token: string): Token {
    const decoded = jwt.decode(token) as Token
    return decoded
  }
}
