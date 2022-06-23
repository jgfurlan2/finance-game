import React from 'react'
import { Container, Modal, Button } from 'react-bootstrap'

import { GetServerSideProps } from 'next'

import { TokenService } from '~/backend/services/TokenService'
import { End } from '~/components/End'
import { FixedLoading } from '~/components/FixedLoading'

import { Game } from '../components/Game'
import { Home } from '../components/Home'

interface Props {
  token: string
  emailToken: string
}

export default function Index({ token, emailToken }: Props): JSX.Element {
  const [financeGame, setFinanceGame] = React.useState<FEFinanceGame>()
  const [loading, setLoading] = React.useState(false)
  const [gameFinished, setGameFinished] = React.useState(false)
  const [error, setError] = React.useState(false)

  function onFormSubmit(response: FEFormResponses): void {
    setFinanceGame({
      name: response.name,
      age: response.age,
      education: response.education.value,
      email: response.email,
      gender: response.gender.value,
      responses: {
        form: response.questions,
        game: null
      }
    })
  }

  async function onGameSubmit(response: GameResponse[][]): Promise<void> {
    try {
      setLoading(true)
      setGameFinished(true)

      const newFinanceGameData = {
        ...financeGame,
        responses: { ...financeGame.responses, game: response }
      }

      await fetch('/api/save', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newFinanceGameData)
      }).then(async (e) => {
        if (e.status !== 201) {
          throw new Error((await e.json())?.error)
        }
      })
    } catch (e) {
      console.log(e)
      setGameFinished(false)
      setError(true)
      setFinanceGame((old) => ({ ...old, responses: { ...old.responses, game: null } }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {!error && (
        <Container>
          {gameFinished ? (
            <End />
          ) : (
            <>
              {financeGame == null ? (
                <Home onSubmit={onFormSubmit} token={emailToken} />
              ) : (
                <Game onSubmit={onGameSubmit} />
              )}
            </>
          )}
          <FixedLoading enabled={loading} />
        </Container>
      )}

      <Modal show={error}>
        <Modal.Header>
          <Modal.Title>Erro ao salvar os dados.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Por favor, repita o jogo ou tente novamente mais tarde.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setError(false)}>Fechar</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (_context) => {
  return {
    props: { token: await TokenService.sign(), emailToken: await TokenService.sign() }
  }
}
