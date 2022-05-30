import { Card as BSCard } from 'react-bootstrap'

import styled from 'styled-components'

export const Card = styled(BSCard)`
  margin: 0 auto;
`

export const Income = styled.div``

export const Expenses = styled.div``

export const Profit = styled.div``

export const Savings = styled.div``

export const RangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const ToSave = styled.div<{ breakLine?: boolean }>`
  white-space: ${({ breakLine }) => (breakLine ? 'normal' : 'nowrap')};
  text-align: center;
`

export const ToSpend = styled.div<{ breakLine?: boolean }>`
  white-space: ${({ breakLine }) => (breakLine ? 'normal' : 'nowrap')};
  text-align: center;
`

export const ModalImage = styled.img`
  border: 1px solid var(--bs-gray);
  border-radius: 4px;
`
