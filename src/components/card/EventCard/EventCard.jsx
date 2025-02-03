import React from 'react';
import {
  Box,
  Image,
  Badge,
  Text,
  Flex,
  Stack,
  Heading,
  useBreakpointValue,
} from '@chakra-ui/react';

const EventCard = ({ event }) => {
  const { image, eventName, stageName, eventType, startDate } = event;

  const cardWidth = useBreakpointValue({ base: '100%', md: '48%', lg: '30%' });
  const imageHeight = useBreakpointValue({ base: '200px', sm: '250px', md: '300px' });

  return (
    <Box
      maxW={cardWidth}
      borderWidth="1px"
      borderRadius="10px"
      overflow="hidden"
      boxShadow="sm"
      _hover={{ boxShadow: 'md' }}
      mb={4}
    >
      <Image src={image} alt={eventName} objectFit="cover" width="100%" height={imageHeight} />

      <Box p={4} bg="#F6F6F6">
        <Stack spacing={3}>
          <Heading as="h3" size="md" noOfLines={1}>
            {eventName}
          </Heading>

          <Flex justify="space-between" align="center">
            <Badge
              fontSize="13px"
              fontWeight="600"
              color="#FFFFFF"
              bg="#3D3CE1"
              borderRadius="5px"
              px={2}
              py={1}
            >
              {startDate}
            </Badge>

            <Text fontSize="13px" fontWeight="500" color="#555555" noOfLines={1}>
              {stageName}
            </Text>
          </Flex>

          <Flex justify="space-between" align="center">
            {eventType?.map((type) => (
              <Badge
                key={type}
                fontSize="13px"
                fontWeight="500"
                color="#FFFFFF"
                bg="#B3B3B3"
                borderRadius="24px"
                px={3}
                py={1}
              >
                {type}
              </Badge>
            ))}
          </Flex>
        </Stack>
      </Box>
    </Box>
  );
};

export default EventCard;
