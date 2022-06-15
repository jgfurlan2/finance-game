import React from 'react'
import { Container } from 'react-bootstrap'

import { Card } from './styled'

export function End(): JSX.Element {
  return (
    <Container>
      <Card className="mt-4">
        <Card.Header>
          <Card.Title>Fim de jogo!</Card.Title>
        </Card.Header>
        <Card.Body>
          <p>Obrigado por jogar o Jogo do Consumo!</p>
          <p>Suas respostas estão sendo salvas. Por favor, aguarde o fim do carregamento.</p>
          <p>Lembrando que suas respostas são sigilosas e serão usadas apenas para fins acadêmicos.</p>
        </Card.Body>
      </Card>
    </Container>
  )
}
