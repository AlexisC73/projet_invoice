import { Token } from './token'

export interface TokenService {
  createConnectToken(payload: Token): string
  verifyConnectToken(token: string): Token
  decode(token: string): Token
}
