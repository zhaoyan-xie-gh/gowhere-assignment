import { Box, Flex, Spinner, Text } from "@chakra-ui/react";

export const LoadingComponent = () => {
  return (
    <Flex justifyContent="center">
      <Box>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Text>Loading...</Text>
      </Box>
    </Flex>
  );
};
