import { DataSource } from 'typeorm'

import { BannedTokenSchema } from '../schemas/BannedTokenSchema'
import { FinanceGameSchema } from '../schemas/FinanceGameSchema'
import { UserSchema } from '../schemas/UserSchema'

export async function initDatabase(): Promise<DataSource> {
  const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: true,
    synchronize: true,
    entities: [FinanceGameSchema, UserSchema, BannedTokenSchema],
    extra: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  })
  await dataSource.initialize()

  return dataSource
}
