import { Button, Container, Flex, Heading } from "@chakra-ui/react";
import type { FallbackProps } from "react-error-boundary";

export const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <Container py="20">
      <Flex flexDir="column">
        <Heading textAlign="center">Ooops, something went wrong :( </Heading>
        <Button
          m="6"
          onClick={() => {
            resetErrorBoundary();
            window.location.assign(window.location.origin);
          }}
        >
          Refresh
        </Button>
      </Flex>
    </Container>
  );
};
