import React from 'react'
import { Modal, Button } from 'react-bootstrap'

import { ModalImage } from './styled'

export const Modals: React.FC = () => {
  const [showModal, setShowModal] = React.useState(1)

  return (
    <>
      <Modal show={showModal === 1}>
        <Modal.Header>
          <Modal.Title>Jogo do Consumo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Você está no mercado de trabalho e tem uma renda que pode oscilar.</p>
          <p>São 10 períodos em que você decidirá entre poupar e fazer uma reserva de emergência.</p>
          <p>
            Importante: Como sua renda pode variar, é esperado que sua reserva para emergência possa cobrir dois meses
            dos seus gastos fixos. Ao final dos 10 períodos não é preciso poupar mais do que isso.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal((old) => old + 1)}>
            Certo. Reserva de emergência são dois períodos de gastos fixos. Podemos avançar!
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModal === 2}>
        <Modal.Header>
          <Modal.Title>Jogo do Consumo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            O gasto fixo e o orçamento são sempre informados no início do período. Basta você escolher entre gastar com
            qualidade de vida ou poupar, como no exemplo abaixo:
          </p>
          <ModalImage className="img-fluid" src="/imgs/exemplo_1.png" alt="exemplo 1" />
          <p>Lembrando: A reserva para emergência ótima cobre dois períodos de gastos fixos.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal((old) => old + 1)}>Entendi. É só deslocar a bolinha! Próximo!</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModal === 3}>
        <Modal.Header>
          <Modal.Title>Jogo do Consumo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Na mudança dos períodos você verá quanto tem de poupança e pode utilizar o dinheiro acumulado para gastar,
            após arcar com os gastos fixos!
          </p>
          <ModalImage className="img-fluid" src="/imgs/exemplo_2.png" alt="exemplo 2" />
          {/* <p>Lembrando: a reserva para emergência ótima cobre dois períodos de gastos fixos.</p> */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(0)}>Entendi! Iniciar o jogo!</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
