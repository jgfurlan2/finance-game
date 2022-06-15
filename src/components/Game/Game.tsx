import React from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap'

import { Modals } from './Modals'
import { RangeContainer, ToSave, ToSpend, Card, GameInfoWrapper } from './styled'

interface Props {
  onSubmit: (responses: GameResponse[][]) => void
}

const phase1Stages: FinanceGameProps[] = [
  {
    income: 11,
    expenses: 6
  },
  {
    income: 11,
    expenses: 6
  },
  {
    income: 9,
    expenses: 6
  },
  {
    income: 11,
    expenses: 6
  },
  {
    income: 9,
    expenses: 6
  },
  {
    income: 9,
    expenses: 6
  },
  {
    income: 11,
    expenses: 6
  },
  {
    income: 9,
    expenses: 6
  },
  {
    income: 9,
    expenses: 6
  },
  {
    income: 11,
    expenses: 6
  }
]

const phase2Stages: FinanceGameProps[] = [
  {
    income: 11,
    expenses: 6
  },
  {
    income: 11,
    expenses: 6
  },
  {
    income: 9,
    expenses: 6
  },
  {
    income: 11,
    expenses: 6
  },
  {
    income: 9,
    expenses: 6
  },
  {
    income: 9,
    expenses: 6
  },
  {
    income: 11,
    expenses: 6
  },
  {
    income: 9,
    expenses: 6
  },
  {
    income: 9,
    expenses: 6
  },
  {
    income: 11,
    expenses: 6
  },
  {
    income: 0,
    expenses: 6
  },
  {
    income: 0,
    expenses: 6
  },
  {
    income: 0,
    expenses: 6
  }
]

export function Game({ onSubmit }: Props): JSX.Element {
  const phases: FinanceGameProps[][] = [phase1Stages, phase2Stages]

  const [chart, setChart] = React.useState<GameResponse[][]>([])
  const [phase, setPhase] = React.useState<number>(0)
  const [stages, setStages] = React.useState<FinanceGameProps[]>(phase1Stages)
  const [stage, setStage] = React.useState(-1)
  const [savings, setSavings] = React.useState(0)
  const [profit, setProfit] = React.useState(0)
  const [stageExpenses, setStageExpenses] = React.useState(0)
  const [showModal, setShowModal] = React.useState(0)

  function nextStage(_stg = stage, _stgs = stages, _svgs = savings): void {
    const stg = _stg ?? stage
    const stgs = _stgs ?? stages
    const svgs = _svgs ?? savings
    const nextStage = (_stg ?? stage) + 1

    const newSavings = svgs + (profit - stageExpenses)

    if (stg >= 0) {
      const newChartData = [...chart]

      if (!newChartData[phase]) {
        newChartData[phase] = []
      }

      newChartData[phase].push({
        income: stgs[stg].income,
        expenses: stgs[stg].expenses,
        stageExpenses,
        savings: newSavings
      })

      setChart(newChartData)
    }

    if (nextStage >= stgs.length) {
      setShowModal((old) => old + 1)
      setSavings(newSavings)
      setProfit(0)
      setStageExpenses(0)

      return
    }

    const nextProfit = stgs[nextStage].income - stgs[nextStage].expenses

    setStage(nextStage)
    setProfit(nextProfit)
    setStageExpenses(nextProfit < 0 ? 0 : nextProfit)
    setSavings(newSavings)
  }

  function nextPhase(): void {
    const nextPhase = phase + 1

    if (nextPhase < phases.length) {
      setPhase(nextPhase)
      setStages(phases[nextPhase])
      setSavings(0)
      setProfit(0)
      setStageExpenses(0)
      setStage(-1)
      nextStage(-1, phases[nextPhase], 0)
    } else {
      onSubmit(chart)
    }
  }

  function showToSave(_savings: number): number {
    if (profit - stageExpenses > 0) {
      return profit - stageExpenses
    } else {
      return 0
    }
  }

  React.useEffect(() => {
    if (stages.length > 0 && stage === -1) {
      nextStage()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Modals />
      <Container>
        {stage >= 0 && stages[stage] && (
          <Card className="mt-4">
            <Card.Header>
              <Card.Title>
                {phase === 0 ? 'Primeira' : 'Última'} fase - Período {stage + 1 > 10 ? 'de Aposentadoria ' : ''}
                {stage + 1} de {stages.length}
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <GameInfoWrapper>
                <div className="phase-objective">
                  {phase === 0 ? (
                    <strong>Objetivo: reserva para emergência</strong>
                  ) : (
                    <strong>Objetivo: reserva para emergência e aposentadoria</strong>
                  )}
                </div>
                <div className="income label">Ganhos no período:</div>
                <div className="income value">R$ {stages[stage].income}</div>
                <div className="expenses label">Gastos fixos:</div>
                <div className="expenses value">R$ {stages[stage].expenses}</div>
                <div className="savings label">Poupança acumulada nos períodos anteriores:</div>
                <div className="savings value">R$ {savings}</div>
                <div className="profit-and-savings label">Após os gastos fixos e somando sua poupança você tem:</div>
                <div className="profit-and-savings value">R$ {savings + profit}</div>
              </GameInfoWrapper>
              <RangeContainer>
                <ToSave className="d-none d-sm-block">Poupar: R$ {showToSave(savings)}</ToSave>
                <ToSave className="d-block d-sm-none" breakLine={true}>
                  Poupar
                  <br />
                  R$ {showToSave(savings)}
                </ToSave>
                <Form.Range
                  min={0}
                  value={stageExpenses}
                  max={savings + profit > 0 ? savings + profit : 0}
                  onChange={(v) => setStageExpenses(v.target.valueAsNumber)}
                />
                <ToSpend className="d-none d-sm-block">Gastos com qualidade de vida: R$ {stageExpenses}</ToSpend>
                <ToSpend className="d-block d-sm-none" breakLine={true}>
                  Gastar
                  <br />
                  R$ {stageExpenses}
                </ToSpend>
              </RangeContainer>
            </Card.Body>
            <Card.Footer>
              {stage < stages.length - 1 ? (
                <Button onClick={() => nextStage()}>Próximo período</Button>
              ) : (
                <Button onClick={() => nextStage()}>Concluir fase</Button>
              )}
            </Card.Footer>
          </Card>
        )}
      </Container>
      {phase === 0 && (
        <>
          <Modal show={showModal === 1}>
            <Modal.Header>
              <Modal.Title>Fim da primeira fase</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Parabéns! Você terminou a primeira fase!</p>
              <p>A última fase é quase idêntica à primeira. Com uma mudança importante:</p>
              <p>São 13 períodos:</p>
              <p>10 em que você tem renda e 3 que você está aposentado, com renda zero.</p>
              <p>Além de fazer a mesma poupança de emergência, você precisa poupar para sua aposentadoria.</p>
              <p>
                <strong>
                  Importante: é esperado que sua reserva para aposentadoria represente 10% da sua renda bruta ao longo
                  da vida.
                </strong>
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setShowModal((old) => old + 1)}>
                Certo. Além da reserva de emergência, a reserva ótima para aposentadoria representa 10% da minha renda
                bruta. Próximo!
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showModal === 2}>
            <Modal.Header>
              <Modal.Title>Última fase!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>13 períodos, 10 períodos iniciais com renda, 3 últimos sem renda.</p>
              <p>Reserva de emergência permanece em dois períodos de gastos fixos.</p>
              <p>Reserva para aposentadoria ótima é de 10% da minha renda.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  setShowModal(0)
                  nextPhase()
                }}
              >
                Entendi. Próxima fase!
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}

      <Modal show={phase === 1 && showModal === 1}>
        <Modal.Header>
          <Modal.Title>Fim de jogo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {savings > 0
            ? `Parabéns! Você conseguiu finalizar o jogo com saldo positivo! Para enviar suas respostas, clique em "Concluir"`
            : `Parabéns! Você finalizou o jogo! Para enviar suas respostas, clique em "Concluir"`}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setShowModal(0)
              nextPhase()
            }}
          >
            Concluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
