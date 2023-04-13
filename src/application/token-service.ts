export interface TokenService {
  createConnectToken(payload: Token): string
}

export type Token = {
  id: string
}
