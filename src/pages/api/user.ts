import type { NextApiRequest, NextApiResponse } from 'next'

import { UserSchema } from '~/backend/schemas/UserSchema'
import { BCryptService } from '~/backend/services/BCryptService'
import { TokenService } from '~/backend/services/TokenService'
import { initDatabase } from '~/backend/utils/initDatabase'

interface Payload {
  token?: string
  user?: UserModel
  error?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Payload>): Promise<void> {
  try {
    if (req.method === 'POST') {
      const { email, password } = req.body as UserModel

      if (!email || email.trim().length === 0) {
        res.status(400).json({ error: 'Email is required' })

        return
      }

      if (!password || password.trim().length === 0) {
        res.status(400).json({ error: 'Password is required' })

        return
      }

      const dataSource = await initDatabase()
      const userExistis = await dataSource.getRepository(UserSchema).findOne({ where: { email } })

      if (!userExistis) {
        res.status(400).json({ error: 'User not found' })

        return
      }

      if (!(await BCryptService.compare(password, userExistis.password))) {
        res.status(400).json({ error: 'Password is not valid' })

        return
      }

      await dataSource.destroy()

      delete userExistis.password

      res.status(201).json({ token: await TokenService.sign({ id: userExistis.id }), user: userExistis })
    } else {
      res.status(405).end()
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e.message ?? 'Unexpected error occurred' })
  }
}
