import { EntitySchema } from 'typeorm'

export const BannedTokenSchema = new EntitySchema<BannedTokenModel>({
  name: 'BannedTokenSchema',
  tableName: 'banned_tokens',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
      nullable: false
    },
    token: {
      type: 'varchar',
      nullable: false,
      unique: true
    }
  }
})
