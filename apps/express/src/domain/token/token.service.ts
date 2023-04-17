import { Token } from './token'

export interface TokenService {
  createConnectToken(payload: Token): string
  decode(token: string): Token
}
