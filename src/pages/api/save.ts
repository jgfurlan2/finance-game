import type { NextApiRequest, NextApiResponse } from 'next'

import { BannedTokenSchema } from '~/backend/schemas/BannedTokenSchema'
import { FinanceGameSchema } from '~/backend/schemas/FinanceGameSchema'
import { initDatabase } from '~/backend/utils/initDatabase'
import { verifyAuthToken } from '~/backend/utils/verifyAuthToken'

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ error?: string }>): Promise<void> {
  try {
    if (req.method === 'POST') {
      if (!(await verifyAuthToken(req.headers.authorization))) {
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

      const { name, email, age, education, gender, responses } = req.body as FinanceGameModel

      if (!name || name.trim().length === 0) {
        res.status(400).json({ error: 'Name is required' })

        return
      }

      if (!email || email.trim().length === 0) {
        res.status(400).json({ error: 'Email is required' })

        return
      }

      if (!age || typeof age !== 'number' || age < 1 || age > 120) {
        res.status(400).json({ error: 'Age is required' })

        return
      }

      if (!education || education.trim().length === 0) {
        res.status(400).json({ error: 'Education is required' })

        return
      }

      if (!gender || gender.trim().length === 0 || (gender !== 'male' && gender !== 'female')) {
        res.status(400).json({ error: 'Gender is required' })

        return
      }

      if (!responses || !Array.isArray(responses) || responses.length === 0) {
        res.status(400).json({ error: 'Responses is required' })

        return
      }

      await dataSource.transaction(async (manager) => {
        const repository = manager.getRepository(FinanceGameSchema)
        await repository.save({ name, email, age, education, gender, responses: JSON.stringify(responses) })
      })

      await dataSource.destroy()

      res.status(201).end()
    } else {
      res.status(405).end()
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e.message ?? 'Unexpected error occurred' })
  }
}
