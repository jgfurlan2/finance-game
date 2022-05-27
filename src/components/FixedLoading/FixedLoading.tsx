import React from 'react'

import { FixedLoadingContainer } from './styled'

interface Props {
  enabled?: boolean
  position?: 'fixed' | 'absolute'
  wrapperStyle?: React.CSSProperties
}

export function FixedLoading({ enabled = true, wrapperStyle, position = 'fixed' }: Props): JSX.Element {
  if (!enabled) {
    return <></>
  }

  return (
    <FixedLoadingContainer style={wrapperStyle} position={position}>
      <div className="loader" />
    </FixedLoadingContainer>
  )
}
