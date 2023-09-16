import { Box, Container, Flex } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

export const Layout: React.FC<PropsWithChildren<{ maxW?: string }>> = ({
  children,
}) => {
  return (
    <Flex>
      <Box flex={1}>
        <Container flex="1 1 auto" minW="100%" px="10" my="10">
          {children}
        </Container>
      </Box>
    </Flex>
  );
};
