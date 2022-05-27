import React from 'react'

export interface AuthContextProps {
  isAuthenticated: boolean
  token: string
  user: UserModel
}

export const AuthContext = React.createContext<AuthContextProps>({
  isAuthenticated: false,
  token: '',
  user: null
})
