declare interface FinanceGameModel {
  id: string
  name: string
  email: string
  age: number
  gender: string
  education: string
  responses: string
  createdAt: Date
}

declare interface UserModel {
  id: string
  name: string
  email: string
  password: string
}

declare interface BannedTokenModel {
  id: string
  token: string
}

declare interface TokenModel {
  id: string
  token: string
  expiresIn: Date
}

declare interface GameResponse {
  income: number
  expenses: number
  savings: number
  stageExpenses: number
}

declare interface FEFormResponses {
  name: string
  email: string
  age: number
  cpf: string
  gender: { value: string; label: string }
  education: { value: string; label: string }
  income: { value: string; label: string }
  questions: string[]
}

declare interface FinanceGameProps {
  income: number
  expenses: number
}

declare interface FEFinanceGame extends Omit<FinanceGameModel, 'id' | 'responses' | 'createdAt'> {
  responses: {
    form: string[]
    game: GameResponse[][]
  }
}
