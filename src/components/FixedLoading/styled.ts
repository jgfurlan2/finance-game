import styled, { keyframes } from 'styled-components'

const loopRoll = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const FixedLoadingContainer = styled.div<{ position: string }>`
  position: ${({ position }) => position};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9990;
  background: rgba(0, 0, 0, 0.05);

  > div {
    border: 4px solid var(--bs-gray);
    border-top: 4px solid var(--bs-indigo);
    border-radius: 50%;
    width: 64px;
    height: 64px;
    animation: ${loopRoll} 1s linear infinite;
  }
`
