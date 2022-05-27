declare interface FinanceGameModel {
  id: string
  name: string
  email: string
  age: number
  gender: string
  education: string
  responses: string
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
