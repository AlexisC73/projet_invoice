export interface TokenService {
  createConnectToken(payload: Token): string
  decode(token: string): Token
}

export type Token = {
  id: string
  role: number
}
