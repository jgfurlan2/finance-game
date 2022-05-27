import React from 'react'
import { Button, Card, Table } from 'react-bootstrap'

import { AuthContext } from '~/context/AuthContext'

import { FixedLoading } from '../FixedLoading'

export const ResponsesResume: React.FC = () => {
  const [loading, setLoading] = React.useState(false)
  const [responses, setResponses] = React.useState<FinanceGameModel[]>([])

  const { token } = React.useContext(AuthContext)

  async function handleGetData(): Promise<void> {
    try {
      setLoading(true)
      const response = await fetch('/api/list', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      }).then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Unable to parse response')
        }
      })
      setResponses(response)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    handleGetData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="mt-2">
      <Button onClick={console.log}>Baixar CSV</Button>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Idade</th>
            <th>Sexo</th>
          </tr>
        </thead>
        <tbody>
          {responses?.map((response) => (
            <tr key={response.id}>
              <td>{response.name}</td>
              <td>{response.email}</td>
              <td>{response.age}</td>
              <td>{response.gender}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <FixedLoading enabled={loading} />
    </div>
  )
}
