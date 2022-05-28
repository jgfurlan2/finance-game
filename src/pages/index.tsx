import React from 'react'
import { Container } from 'react-bootstrap'

import { GetServerSideProps } from 'next'

import { TokenService } from '~/backend/services/TokenService'

import { Game } from '../components/Game'
import { Home } from '../components/Home'

interface Props {
  token: string
}

interface FEFinanceGame extends Omit<FinanceGameModel, 'id' | 'responses'> {
  responses: {
    form: string[]
    game: GameResponse[][]
  }
}

export default function Index({ token }: Props): JSX.Element {
  const [financeGame, setFinanceGame] = React.useState<FEFinanceGame>()

  function onFormSubmit(response: FEFormResponses): void {
    console.log(response)

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

  function onGameSubmit(response: GameResponse[][]): void {
    setFinanceGame((old) => ({
      ...old,
      responses: { ...old.responses, game: response }
    }))
  }

  React.useEffect(() => {
    console.log(financeGame)
  }, [financeGame])

  return (
    <Container>{financeGame == null ? <Home onSubmit={onFormSubmit} /> : <Game onSubmit={onGameSubmit} />}</Container>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (_context) => {
  return {
    props: { token: await TokenService.sign() }
  }
}
