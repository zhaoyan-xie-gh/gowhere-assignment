import { Container, Button, Heading } from '@chakra-ui/react'
import type { FallbackProps } from 'react-error-boundary'
import React from 'react'

export const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <Container>
      <Heading>Ooops, something went wrong :( </Heading>
      <Button
        onClick={() => {
          resetErrorBoundary()
          window.location.assign(window.location.origin)
        }}
      >
        Refresh
      </Button>
    </Container>
  )
}
