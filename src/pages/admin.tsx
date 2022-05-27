import React from 'react'
import { Card, Container } from 'react-bootstrap'

import { AdminLoginPage } from '~/components/AdminLoginPage'
import { ResponsesResume } from '~/components/ResponsesResume'
import { AuthContext } from '~/context/AuthContext'

export default function Admin(): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [token, setToken] = React.useState('')
  const [user, setUser] = React.useState<UserModel>(null)

  function setAuthenticated(token: string, user: UserModel): void {
    setIsAuthenticated(true)
    setToken(token)
    setUser(user)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, user }}>
      {!isAuthenticated && <AdminLoginPage setAuthenticated={setAuthenticated} />}
      {isAuthenticated && (
        <>
          <Container className="mt-3">
            <Card>
              <Card.Body>Olá {user.name}</Card.Body>
            </Card>
            <ResponsesResume />
          </Container>
        </>
      )}
    </AuthContext.Provider>
  )
}
