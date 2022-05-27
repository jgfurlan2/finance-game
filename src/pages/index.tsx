import React from 'react'
import { Button, Col, Container, Row, Modal, Form, FormGroup, FormControl, FormCheck } from 'react-bootstrap'
import ReactSelect from 'react-select'

import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { TokenService } from '~/backend/services/TokenService'

import { Header, Paragraph, HomeContainer } from '../styles'

interface Props {
  token: string
}

const questions = [
  {
    number: 1,
    text: 'Suponha que você tenha R$ 100 em uma conta poupança e a taxa de juros seja de 2% ao ano. Depois de 5 anos, quanto você acha que teria na conta se deixasse o dinheiro render?',
    options: [
      { text: 'Mais de R$ 102' },
      { text: 'Exatamente R$ 102' },
      { text: 'Menos de R$ 102' },
      { text: 'Não sei' },
      { text: 'Prefiro não dizer' }
    ]
  },
  {
    number: 2,
    text: 'Imagine que a taxa de juros da sua caderneta de poupança fosse de 1% ao ano e a inflação fosse de 2% ao ano. Após 1 ano, quanto você seria capaz de comprar com o dinheiro dessa conta?',
    options: [
      { text: 'Mais do que hoje' },
      { text: 'Exatamente o mesmo' },
      { text: 'Menos do que hoje' },
      { text: 'Não sei' },
      { text: 'Prefiro não dizer' }
    ]
  },
  {
    number: 3,
    text: 'Se as taxas de juros subirem, o que normalmente acontecerá com os preços dos títulos?',
    options: [
      { text: 'Eles vão subir' },
      { text: 'Eles vão cair' },
      { text: 'Eles permanecerão os mesmos' },
      { text: 'Não há relação entre os preços dos títulos e a taxa de juros' },
      { text: 'Não sei' },
      { text: 'Prefiro não dizer' }
    ]
  },
  {
    number: 4,
    text: 'Uma hipoteca de 15 anos normalmente exige pagamentos mensais mais altos do que uma hipoteca de 30 anos, mas o total de juros pagos ao longo da vida do empréstimo será menor.',
    options: [{ text: 'Verdadeiro' }, { text: 'Falso' }, { text: 'Não sei' }, { text: 'Prefiro não dizer' }]
  },
  {
    number: 5,
    text: 'Comprar ações de uma única empresa geralmente oferece um retorno mais seguro do que um fundo mútuo de ações.',
    options: [{ text: 'Verdadeiro' }, { text: 'Falso' }, { text: 'Não sei' }, { text: 'Prefiro não dizer' }]
  }
]

export default function Home({ token }: Props): JSX.Element {
  const { push: navigate } = useRouter()

  const [showModal, setShowModal] = React.useState(0)

  React.useEffect(() => {
    console.log(token)
  }, [])

  return (
    <Container>
      {/* <Row>
        <Col xs={12}>
          <Button onClick={() => navigate('/game')}>CLICK-ME</Button>
        </Col>
      </Row> */}
      <HomeContainer>
        <Header>Jogo do Consumo</Header>
        <Paragraph>
          Obrigado por participar do Jogo do Consumo! Por favor, antes de iniciar, responda às perguntas abaixo:
        </Paragraph>
        <Form>
          <FormGroup>
            <label>Nome:</label>
            <FormControl type="text" />
          </FormGroup>
          <FormGroup>
            <label>Email:</label>
            <FormControl type="text" />
          </FormGroup>
          <FormGroup>
            <label>Idade:</label>
            <FormControl type="text" />
          </FormGroup>
          <FormGroup>
            <label>Sexo:</label>

            <ReactSelect
              options={[
                { value: 'masculino', label: 'Masculino' },
                { value: 'feminino', label: 'Feminino' },
                { value: 'nao', label: 'Não quero declarar' }
              ]}
              placeholder={'Selecione...'}
            />
          </FormGroup>
          <FormGroup>
            <label>Escolaridade:</label>

            <ReactSelect
              options={[
                { value: 'fundamental', label: 'Masculino' },
                { value: 'medio', label: 'Feminino' },
                { value: 'superior', label: 'Não quero declarar' },
                { value: 'pos', label: 'Pós-graduação' }
              ]}
              placeholder={'Selecione...'}
            />
          </FormGroup>
          <FormGroup>
            {questions.map((question, index) => {
              return (
                <div key={index}>
                  <label>Questão {question.number}</label>
                  <p>{question.text}</p>
                  {question.options.map((option, idx) => {
                    return (
                      <FormCheck key={idx} type={'radio'} label={option.text} name={`question-${question.number}`} />
                    )
                  })}
                </div>
              )
            })}
          </FormGroup>
          <Button className="start-button" onClick={() => setShowModal((old) => old + 1)}>
            Enviar respostas e iniciar
          </Button>
        </Form>
      </HomeContainer>
      <Modal show={showModal === 1}>
        <Modal.Header>
          <Modal.Title>Jogo do Consumo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Você está no mercado de trabalho e tem uma renda que pode oscilar.</p>
          <p>São 10 períodos em que você decidirá entre poupar e fazer uma reserva de emergência.</p>
          <p>
            Importante: como sua renda pode variar, é esperado que sua reserva para emergência possa cobrir dois meses
            dos seus gastos fixos. Ao final dos 10 períodos não é preciso poupar mais do que isso..
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setShowModal((old) => old + 1)
            }}
          >
            Certo. Reserva de emergência são dois períodos de gastos fixos. Podemos avançar!
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModal === 2}>
        <Modal.Header>
          <Modal.Title>Jogo do Consumo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Você está no mercado de trabalho e tem uma renda que pode oscilar.</p>
          <p>São 10 períodos em que você decidirá entre poupar e fazer uma reserva de emergência.</p>
          <p>
            Importante: como sua renda pode variar, é esperado que sua reserva para emergência possa cobrir dois meses
            dos seus gastos fixos. Ao final dos 10 períodos não é preciso poupar mais do que isso..
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setShowModal((old) => old + 1)
            }}
          >
            Concluir
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (_context) => {
  return {
    props: { token: await TokenService.sign() }
  }
}
