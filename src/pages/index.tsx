import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'

import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Home(): JSX.Element {
  const { push: navigate } = useRouter()

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Button onClick={() => navigate('/game')}>CLICK-ME</Button>
        </Col>
      </Row>
    </Container>
  )
}
