import React from 'react'
import { Button, Container, Modal, Form, FormGroup, FormControl, FormCheck } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import ReactSelect from 'react-select'

import { Header, Paragraph, HomeContainer } from './styled'

interface Props {
  onSubmit: (responses: FEFormResponses) => void
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

export function Home({ onSubmit }: Props): JSX.Element {
  const { control, handleSubmit } = useForm<FEFormResponses>({ mode: 'all' })

  const [showModal, setShowModal] = React.useState(0)

  return (
    <Container>
      <HomeContainer>
        <Header>Jogo do Consumo</Header>
        <Paragraph>
          Obrigado por participar do Jogo do Consumo! Por favor, antes de iniciar, responda às perguntas abaixo:
        </Paragraph>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <label>Nome:</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <FormControl type="text" {...field} required />}
            />
          </FormGroup>
          <FormGroup>
            <label>Email:</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <FormControl type="text" {...field} required />}
            />
          </FormGroup>
          <FormGroup>
            <label>Idade:</label>
            <Controller
              name="age"
              control={control}
              render={({ field }) => <FormControl type="number" {...field} required />}
            />
          </FormGroup>
          <FormGroup>
            <label>Sexo:</label>
            <Controller
              name="gender"
              control={control}
              render={({ field: { name, onBlur, onChange, ref, value } }) => (
                <ReactSelect
                  options={[
                    { value: 'masculino', label: 'Masculino' },
                    { value: 'feminino', label: 'Feminino' },
                    { value: 'nao', label: 'Não quero declarar' }
                  ]}
                  placeholder={'Selecione...'}
                  ref={ref}
                  onBlur={onBlur}
                  name={name}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </FormGroup>
          <FormGroup>
            <label>Escolaridade:</label>
            <Controller
              render={({ field: { name, onBlur, onChange, ref, value } }) => (
                <ReactSelect
                  options={[
                    { value: 'fundamental', label: 'Ensino fundamental completo' },
                    { value: 'medio', label: 'Ensino médio completo' },
                    { value: 'superior', label: 'Ensino superior completo' },
                    { value: 'pos', label: 'Pós-graduação' }
                  ]}
                  placeholder={'Selecione...'}
                  ref={ref}
                  onBlur={onBlur}
                  name={name}
                  value={value}
                  onChange={onChange}
                />
              )}
              name="education"
              control={control}
            />
          </FormGroup>
          <FormGroup>
            {questions.map((question, questionIndex) => {
              return (
                <FormGroup key={questionIndex}>
                  <label>Questão {question.number}</label>
                  <p>{question.text}</p>
                  {question.options.map((option, optionIndex) => {
                    return (
                      <Controller
                        key={optionIndex}
                        name={`questions.${questionIndex}`}
                        control={control}
                        render={({ field }) => (
                          <FormCheck
                            key={optionIndex}
                            {...field}
                            type={'radio'}
                            label={option.text}
                            value={option.text}
                          />
                        )}
                      />
                    )
                  })}
                </FormGroup>
              )
            })}
          </FormGroup>
          <Button className="start-button" onClick={() => setShowModal((old) => old + 1)} type="submit">
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
            dos seus gastos fixos. Ao final dos 10 períodos não é preciso poupar mais do que isso.
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
          <p>
            O gasto fixo e o orçamento são sempre informados no início do período. Basta você escolher entre gastar com
            qualidade de vida ou poupar, como no exemplo abaixo:
          </p>
          <p>Lembrando: a reserva para emergência ótima cobre dois períodos de gastos fixos.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setShowModal((old) => old + 1)
            }}
          >
            Entendi. É só deslocar a bolinha! Próximo!
          </Button>
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
          <p>Lembrando: a reserva para emergência ótima cobre dois períodos de gastos fixos.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setShowModal(0)
            }}
          >
            Entendi! Iniciar o jogo!
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}
