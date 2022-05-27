import { JwtPayload } from 'jsonwebtoken'

import { TokenService } from '../services/TokenService'

export async function verifyAuthToken(authToken: string): Promise<JwtPayload> {
  if (!authToken) {
    throw new Error('Token not sended')
  }

  const tokenSplit = authToken.split(' ')

  if (tokenSplit.length !== 2) {
    throw new Error('Token error')
  }

  const [bearer, token] = tokenSplit

  if (!/^Bearer$/i.test(bearer)) {
    throw new Error('Token malformed')
  }

  return TokenService.decode(token)
}
