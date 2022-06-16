import type { NextApiRequest, NextApiResponse } from 'next'

import { BannedTokenSchema } from '~/backend/schemas/BannedTokenSchema'
import { FinanceGameSchema } from '~/backend/schemas/FinanceGameSchema'
import { initDatabase } from '~/backend/utils/initDatabase'
import { verifyAuthToken } from '~/backend/utils/verifyAuthToken'
import validateCPF from '~/utils/validateCpf'

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

      const { name, email, age, cpf, education, gender, responses } = req.body as FinanceGameModel

      if (!name || name.trim().length === 0) {
        res.status(400).json({ error: 'Name is required' })

        return
      }

      if (
        !email ||
        email.trim().length === 0 ||
        (await dataSource.getRepository(FinanceGameSchema).findOne({ where: { email } }))
      ) {
        res.status(400).json({ error: 'Email is required' })

        return
      }

      if (!age || Number(age) < 18 || Number(age) > 120) {
        res.status(400).json({ error: 'Age is required' })

        return
      }

      if (!education || education.trim().length === 0) {
        res.status(400).json({ error: 'Education is required' })

        return
      }

      if (!gender || gender.trim().length === 0 || (gender !== 'male' && gender !== 'female' && gender !== 'unknown')) {
        res.status(400).json({ error: 'Gender is required' })

        return
      }

      if (
        !cpf ||
        !validateCPF(cpf) ||
        (await dataSource.getRepository(FinanceGameSchema).findOne({ where: { cpf } }))
      ) {
        res.status(400).json({ error: 'CPF is required' })

        return
      }

      if (!responses) {
        res.status(400).json({ error: 'Responses is required' })

        return
      }

      await dataSource.transaction(async (manager) => {
        await manager.getRepository(FinanceGameSchema).save({
          name,
          email,
          age,
          cpf,
          education,
          gender,
          responses: JSON.stringify(responses),
          createdAt: new Date()
        })

        await manager.getRepository(BannedTokenSchema).save({ token })
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
