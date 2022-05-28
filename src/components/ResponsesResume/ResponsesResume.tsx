import React from 'react'
import { Button, Table } from 'react-bootstrap'

import { parse } from 'json2csv'

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

  function generateCSV(): void {
    const jsonCSV = responses.map((res) => {
      const responses: FEFinanceGame['responses'] = JSON.parse(res.responses)
      const flatForm = responses.form.reduce((prev, crr, i) => ({ ...prev, [`formulario-questao-${i + 1}`]: crr }), {})
      const flatGame = responses.game.reduce(
        (prev, crr, i) => ({
          ...prev,
          ...crr.reduce((gprev, gcrr, gi) => {
            return {
              ...gprev,
              [`game-fase-${i + 1}-estagio-${gi + 1}-ganhos`]: gcrr.income,
              [`game-fase-${i + 1}-estagio-${gi + 1}-despesas`]: gcrr.expenses,
              [`game-fase-${i + 1}-estagio-${gi + 1}-custo-de-vida`]: gcrr.stageExpenses,
              [`game-fase-${i + 1}-estagio-${gi + 1}-poupanca`]: gcrr.savings
            }
          }, {})
        }),
        {}
      )

      return {
        nome: res.name,
        'e-mail': res.email,
        idade: res.age,
        sexo: res.gender,
        escolaridade: res.education,
        ...flatForm,
        ...flatGame
      }
    })

    const hiddenElement = document.createElement('a')
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(parse(jsonCSV))
    hiddenElement.target = '_blank'
    hiddenElement.download = 'respostas.csv'
    hiddenElement.click()
  }

  React.useEffect(() => {
    handleGetData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="mt-2">
      <Button onClick={generateCSV} className="mb-2">
        Baixar CSV
      </Button>
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
