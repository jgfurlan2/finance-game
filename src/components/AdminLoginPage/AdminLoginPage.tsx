import React from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'

import { FixedLoading } from '../FixedLoading'
import { AdminLoginPageContainer } from './styled'

interface Props {
  setAuthenticated(token: string, user: UserModel): void
}

export function AdminLoginPage({ setAuthenticated }: Props): JSX.Element {
  const [state, setState] = React.useState<Pick<UserModel, 'email' | 'password'>>({ email: '', password: '' })
  const [error, setError] = React.useState<string>(null)
  const [loading, setLoading] = React.useState(false)

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
    try {
      e.preventDefault()
      setLoading(true)
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: state.email, password: state.password })
      }).then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Unable to parse response')
        }
      })
      setAuthenticated(response.token, response.user)
    } catch (e) {
      console.log(e)
      setError(e.message ?? 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AdminLoginPageContainer>
        <Card>
          <Card.Header>
            <Card.Title>Login</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group>
                <Form.Label>E-mail</Form.Label>
                <Form.Control type="email" onChange={(e) => setState((o) => ({ ...o, email: e.target.value }))} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={(e) => setState((o) => ({ ...o, password: e.target.value }))} />
              </Form.Group>
              <Button variant="primary" disabled={loading} onClick={(e) => handleSubmit(e)}>
                Entrar
              </Button>
            </Form>
          </Card.Body>
        </Card>
        {error && (
          <Alert className="mt-2" variant="danger">
            {error}
          </Alert>
        )}
      </AdminLoginPageContainer>

      <FixedLoading enabled={loading} />
    </>
  )
}
