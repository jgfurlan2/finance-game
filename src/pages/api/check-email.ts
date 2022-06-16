import kickbox from 'kickbox'
import type { NextApiRequest, NextApiResponse } from 'next'

import { BannedTokenSchema } from '~/backend/schemas/BannedTokenSchema'
import { initDatabase } from '~/backend/utils/initDatabase'
import { verifyAuthToken } from '~/backend/utils/verifyAuthToken'

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
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

      const email = req.query.email
      const kickboxClient = kickbox.client(process.env.KICKBOX_TOKEN).kickbox()
      const [isValid, reason] = await new Promise((resolve, reject) => {
        kickboxClient.verify(email, function (err, response) {
          if (err) {
            reject(err)
          }

          if (!err && response.body.result === 'deliverable') {
            resolve([true, null])
          } else {
            resolve([false, response.body.reason])
          }
        })
      })

      await dataSource.transaction(async (manager) => {
        await manager.getRepository(BannedTokenSchema).save({ token })
      })

      await dataSource.destroy()

      res.status(200).json({ isValid, reason })
    } else {
      res.status(405).end()
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e.message ?? 'Unexpected error occurred' })
  }
}
