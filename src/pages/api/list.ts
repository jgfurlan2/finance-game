import type { NextApiRequest, NextApiResponse } from 'next'

import { BannedTokenSchema } from '~/backend/schemas/BannedTokenSchema'
import { FinanceGameSchema } from '~/backend/schemas/FinanceGameSchema'
import { UserSchema } from '~/backend/schemas/UserSchema'
import { initDatabase } from '~/backend/utils/initDatabase'
import { verifyAuthToken } from '~/backend/utils/verifyAuthToken'

type Payload = { error?: string } | FinanceGameModel[]

export default async function handler(req: NextApiRequest, res: NextApiResponse<Payload>): Promise<void> {
  try {
    if (req.method === 'GET') {
      const tokenPayload = await verifyAuthToken(req.headers.authorization)
      if (!tokenPayload) {
        res.status(401).json({ error: 'Token not valid' })

        return
      }

      const dataSource = await initDatabase()
      const [, token] = req.headers.authorization.split(' ')
      const tokenBanned = await dataSource.getRepository(BannedTokenSchema).findOne({ where: { token } })

      if (tokenBanned) {
        res.status(400).json({ error: 'Token is invalid' })

        return
      }

      const userExists = await dataSource.getRepository(UserSchema).findOne({ where: { id: tokenPayload.id } })

      if (!userExists) {
        res.status(400).json({ error: 'User not found' })

        return
      }

      const responses = await dataSource.getRepository(FinanceGameSchema).find()

      res.status(200).json(responses)
    } else {
      res.status(405).end()
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e.message ?? 'Unexpected error occurred' })
  }
}
