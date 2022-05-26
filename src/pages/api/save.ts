// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { DataSource } from 'typeorm'

import { FinanceGameSchema } from '../../backend/schemas/FinanceGameModel'

interface Data {
  id?: string
  error?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> {
  if (req.method === 'POST') {
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

    const dataSource = new DataSource({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: true,
      synchronize: true,
      entities: [FinanceGameSchema],
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    })

    await dataSource.initialize()
    await dataSource.transaction(async (manager) => {
      const repository = manager.getRepository(FinanceGameSchema)
      await repository.save({ name, email, age, education, gender, responses: JSON.stringify(responses) })
    })

    res.status(201).end()
  } else {
    res.status(405).end()
  }
}
