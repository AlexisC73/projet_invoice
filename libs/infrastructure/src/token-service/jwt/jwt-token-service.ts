import { Token } from '@invoice/domain/dist/token/token'
import { TokenService } from '@invoice/domain/dist/token/token.service'
import * as jwt from 'jsonwebtoken'

export class JWTTokenService implements TokenService {
  constructor(private readonly secretJWT: string) {}
  createConnectToken(payload: Token): string {
    return jwt.sign(payload, this.secretJWT, {
      expiresIn: '24h',
    })
  }
  verifyConnectToken(token: string): Token {
    const decoded = jwt.verify(token, this.secretJWT)
    if (typeof decoded !== 'object') throw new Error('Invalid token')
    return decoded as Token
  }
  decode(token: string): Token {
    const decoded = jwt.decode(token)
    if (typeof decoded !== 'object') throw new Error('Invalid token')
    return decoded as Token
  }
}
