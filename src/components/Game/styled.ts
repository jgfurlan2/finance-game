import { Card as BSCard } from 'react-bootstrap'

import styled from 'styled-components'

export const Card = styled(BSCard)`
  margin: 0 auto;
`

export const GameInfoWrapper = styled.div`
  display: grid;
  grid-template-areas:
    'INC VINC'
    'EXP VEXP'
    'SVG VSVG'
    'PFT VPFT';
  gap: 0 8px;

  grid-template-columns: minmax(fit-content, 350px) 1fr;

  > .value {
    font-size: 18px;
    font-weight: 600;
  }

  > .income {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &.label {
      grid-area: INC;
    }

    &.value {
      grid-area: VINC;
      color: var(--bs-blue);
    }
  }

  > .expenses {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &.label {
      grid-area: EXP;
    }

    &.value {
      grid-area: VEXP;
      color: var(--bs-red);
    }
  }

  > .savings {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &.label {
      grid-area: SVG;
    }

    &.value {
      grid-area: VSVG;
    }
  }

  > .profit-and-savings {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &.label {
      grid-area: PFT;
    }

    &.value {
      grid-area: VPFT;
    }
  }
`

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
