// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Finance, PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Body {
  name: string
  email: string
  responses: GameResponse
}

interface Data {
  id?: string
  error?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> {
  if (req.method === 'POST') {
    const { name, email, responses } = req.body as Body

    if (!name || name.trim().length === 0) {
      res.status(400).json({ error: 'Name is required' })

      return
    }

    if (!email || email.trim().length === 0) {
      res.status(400).json({ error: 'Email is required' })

      return
    }

    if (!responses || !Array.isArray(responses) || responses.length === 0) {
      res.status(400).json({ error: 'Responses is required' })

      return
    }

    const prisma = new PrismaClient()

    const response = await prisma.finance.create({
      data: {
        name,
        email,
        responses: JSON.stringify(responses)
      }
    })

    res.status(201).json({ id: response.id })
  } else {
    res.status(405).end()
  }
}
