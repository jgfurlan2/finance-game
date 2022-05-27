import { EntitySchema } from 'typeorm'

export const UserSchema = new EntitySchema<UserModel>({
  name: 'UserSchema',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
      nullable: false
    },
    name: {
      type: 'varchar',
      nullable: false
    },
    email: {
      type: 'varchar',
      nullable: false,
      unique: true
    },
    password: {
      type: 'varchar',
      nullable: false
    }
  }
})
