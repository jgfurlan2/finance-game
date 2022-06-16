import { EntitySchema } from 'typeorm'

export const FinanceGameSchema = new EntitySchema<FinanceGameModel>({
  name: 'FinanceGameSchema',
  tableName: 'finance_game',
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
      nullable: false
    },
    cpf: {
      type: 'varchar',
      nullable: false,
      unique: true
    },
    age: {
      type: 'int',
      nullable: false
    },
    gender: {
      type: 'varchar',
      nullable: false
    },
    education: {
      type: 'varchar',
      nullable: false
    },
    responses: {
      type: 'text',
      nullable: false
    },
    createdAt: {
      type: 'timestamp',
      nullable: false,
      createDate: true
    }
  }
})
