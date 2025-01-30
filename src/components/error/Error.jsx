import React from 'react';
import { Box, Center, VStack, Text, List, ListItem } from '@chakra-ui/react';

const Error = ({ missingParams }) => {
  return (
    <Center h="100vh" bg="gray.100">
      <VStack
        spacing={4}
        p={6}
        bg="white"
        boxShadow="md"
        borderRadius="lg"
        textAlign="center"
        maxW="md"
      >
        <Text fontSize="4xl">⚠️</Text>
        <Text fontSize="2xl" fontWeight="bold" color="red.600">
          Configuration Error
        </Text>
        <Text fontSize="lg" color="gray.700">
          The following required parameters are missing:
        </Text>
        <Box bg="red.50" p={4} borderRadius="md" w="full">
          <List spacing={2} color="red.600">
            {missingParams.map((param, index) => (
              <ListItem key={index}>• {param}</ListItem>
            ))}
          </List>
        </Box>
        <Text fontSize="md" color="gray.600">
          Please modify your configuration and try again.
        </Text>
      </VStack>
    </Center>
  );
};

export default Error;
