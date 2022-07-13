import React from 'react'
import { Button, Container, Form, Col, Row, Card } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import ReactSelect from 'react-select'

import { FixedLoading } from '../FixedLoading'
import { Header, Paragraph } from './styled'

interface Props {
  onSubmit: (responses: FEFormResponses) => void
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

export function Home({ onSubmit, token }: Props): JSX.Element {
  const { control, handleSubmit } = useForm<FEFormResponses>({ mode: 'all' })

  const [isLoading, setIsLoading] = React.useState(false)

  async function handleOnSubmit(data: FEFormResponses): Promise<void> {
    try {
      setIsLoading(true)
      const status = await fetch(`/api/check-email?email=${data.email}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then(async (e) => {
        if (e.status !== 200) {
          throw new Error((await e.json())?.error)
        } else {
          return e.json()
        }
      })

      if (status.isValid === false) {
        alert(`Email inválido\n${status.reason}\nRECARREGUE A PAGINA E TENTE NOVAMENTE`)
      } else {
        onSubmit(data)
      }
    } catch (e) {
      console.log(e)
      alert('Ocorreu um erro, recarregue a pagina e tente novamente')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading && <FixedLoading enabled />}
      <Container>
        <Row>
          <Col xs={12}>
            <Header>Jogo do Consumo</Header>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col xs={12}>
            <Paragraph>Obrigado por participar do Jogo do Consumo!</Paragraph>
            <Paragraph>
              Seus dados não serão compartilhados e as respostas possuem fins estritamente acadêmicos. Por favor, antes
              de iniciar, responda às perguntas abaixo:
            </Paragraph>
          </Col>
        </Row>

        <Form onSubmit={handleSubmit(handleOnSubmit)}>
          <Card>
            <Card.Body>
              <Row>
                <Col xs={12}>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <Form.Group>
                        <Form.Label htmlFor="form-field-name">Nome</Form.Label>{' '}
                        <Form.Control
                          type="text"
                          id="form-field-name"
                          isValid={fieldState.isTouched && !fieldState.error}
                          isInvalid={!!fieldState.error}
                          {...field}
                          value={field.value ?? ''}
                        />
                      </Form.Group>
                    )}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs={12}>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: true,
                      pattern:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    }}
                    render={({ field, fieldState }) => (
                      <Form.Group>
                        <Form.Label htmlFor="form-field-email" className="mt-2">
                          E-mail
                        </Form.Label>
                        <Form.Control
                          type="email"
                          id="form-field-email"
                          isValid={fieldState.isTouched && !fieldState.error}
                          isInvalid={!!fieldState.error}
                          {...field}
                          value={field.value ?? ''}
                        />
                      </Form.Group>
                    )}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs={12}>
                  <Controller
                    name="age"
                    control={control}
                    rules={{
                      required: true,
                      validate: (value) =>
                        !Number.isNaN(Number(value)) &&
                        Number.isInteger(Number(value)) &&
                        Number(value) >= 18 &&
                        Number(value) <= 120
                    }}
                    render={({ field, fieldState }) => (
                      <Form.Group>
                        <Form.Label htmlFor="form-field-age" className="mt-2">
                          Idade (+18)
                        </Form.Label>
                        <Form.Control
                          type="number"
                          id="form-field-age"
                          isValid={fieldState.isTouched && !fieldState.error}
                          isInvalid={!!fieldState.error}
                          {...field}
                          value={field.value ?? ''}
                        />
                      </Form.Group>
                    )}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs={12}>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <Form.Group>
                        <Form.Label htmlFor="form-field-gender" className="mt-2">
                          Sexo
                        </Form.Label>
                        <ReactSelect
                          options={[
                            { value: 'male', label: 'Masculino' },
                            { value: 'female', label: 'Feminino' }
                          ]}
                          styles={{
                            control(provided, state) {
                              if (fieldState.isTouched && fieldState.error) {
                                return {
                                  ...provided,
                                  borderColor: 'var(--bs-red)',
                                  boxShadow: 'none'
                                }
                              }

                              if (state.isFocused) {
                                return {
                                  ...provided,
                                  borderColor: 'var(--bs-blue)',
                                  boxShadow: 'none'
                                }
                              }

                              return provided
                            }
                          }}
                          placeholder="Selecione..."
                          id="form-field-gender"
                          {...field}
                          value={field.value ?? { value: '', label: '' }}
                        />
                      </Form.Group>
                    )}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs={12}>
                  <Controller
                    name="education"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <Form.Group>
                        <Form.Label htmlFor="form-field-education" className="mt-2">
                          Escolaridade
                        </Form.Label>
                        <ReactSelect
                          options={[
                            { value: 'fundamental', label: 'Ensino fundamental completo' },
                            { value: 'medio', label: 'Ensino médio completo' },
                            { value: 'superior-andamento', label: 'Ensino superior em andamento' },
                            { value: 'superior', label: 'Ensino superior completo' },
                            { value: 'pos', label: 'Pós-graduação' }
                          ]}
                          styles={{
                            control(provided, state) {
                              if (fieldState.isTouched && fieldState.error) {
                                return {
                                  ...provided,
                                  borderColor: 'var(--bs-red)',
                                  boxShadow: 'none'
                                }
                              }

                              if (state.isFocused) {
                                return {
                                  ...provided,
                                  borderColor: 'var(--bs-blue)',
                                  boxShadow: 'none'
                                }
                              }

                              return provided
                            }
                          }}
                          placeholder="Selecione..."
                          id="form-field-education"
                          {...field}
                          value={field.value ?? { value: '', label: '' }}
                        />
                      </Form.Group>
                    )}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Controller
                    name="income"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <Form.Group>
                        <Form.Label htmlFor="form-field-income" className="mt-2">
                          Faixa de renda individual
                        </Form.Label>
                        <ReactSelect
                          options={[
                            { value: '2424', label: 'Até 2.424 reais mensais' },
                            { value: '2425-4848', label: 'Entre 2.425 a 4.848 reais mensais' },
                            { value: '4849-12120', label: 'Entre 4.849 e 12.120 reais mensais' },
                            { value: '12121+', label: 'Acima de 12.121 reais mensais' }
                          ]}
                          styles={{
                            control(provided, state) {
                              if (fieldState.isTouched && fieldState.error) {
                                return {
                                  ...provided,
                                  borderColor: 'var(--bs-red)',
                                  boxShadow: 'none'
                                }
                              }

                              if (state.isFocused) {
                                return {
                                  ...provided,
                                  borderColor: 'var(--bs-blue)',
                                  boxShadow: 'none'
                                }
                              }

                              return provided
                            }
                          }}
                          placeholder="Selecione..."
                          id="form-field-income"
                          {...field}
                          value={field.value ?? { value: '', label: '' }}
                        />
                      </Form.Group>
                    )}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {questions.map((question, questionIndex) => (
            <Card key={questionIndex} className="mt-2">
              <Card.Body>
                <Row>
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label style={{ fontWeight: 600 }}>Questão {question.number}</Form.Label>
                      <p>{question.text}</p>
                      {question.options.map((option, optionIndex) => (
                        <Controller
                          key={optionIndex}
                          name={`questions.${questionIndex}`}
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Form.Check
                              key={optionIndex}
                              {...field}
                              id={`question-${questionIndex}-option-${optionIndex}`}
                              type="radio"
                              label={option.text}
                              value={option.text}
                            />
                          )}
                        />
                      ))}
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}

          <Row>
            <Col xs={12} className="d-flex justify-content-center my-4">
              <Button type="submit">Enviar respostas e iniciar</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  )
}
