import React from 'react';
import { Box, Image, Heading, Stack, Text, useBreakpointValue, Flex } from '@chakra-ui/react';
import EventTypeBadge from '../../badge/EventTypeBadge/EventTypeBadge';
import DateBadge from '../../badge/DateBadge/DateBadge';
import StageIcon from '../../../assets/LocationPin.svg';

const EventCard = ({ event }) => {
  const { image, eventName, stageName, eventType = [], startDate, altText } = event;

  const cardWidth = useBreakpointValue({ base: '100%', sm: '48%', md: '32%', lg: '30%' });
  const imageHeight = useBreakpointValue({ base: '200px', sm: '250px', md: '300px' });

  return (
    <Box
      flex="1 1 auto"
      width={cardWidth}
      maxWidth="370px"
      minWidth="250px"
      borderRadius="10px"
      overflow="hidden"
      mb={4}
    >
      <Image src={image} alt={altText} objectFit="cover" width="100%" height={imageHeight} />

      <Box p={4} bg="var(--event-card-bg)">
        <Stack spacing={3}>
          <Heading as="h3" size="md" noOfLines={2} isTruncated fontSize={'16px'}>
            {eventName}
          </Heading>

            <DateBadge startDate={startDate} />

          <Flex align="center" gap={1}>
            <Image src={StageIcon} alt="Stage Icon" boxSize="16px" />
              <Text
                fontSize="13px"
                fontWeight="500"
              color="var(--event-name-color)"
                noOfLines={1}
                isTruncated
              >
                {stageName}
              </Text>
          </Flex>

          <Flex wrap="wrap" spacing={3} justify="flex-start" gap={2}>
            {eventType?.length &&
              eventType?.map((value, key) => <EventTypeBadge eventType={value} key={key} />)}
          </Flex>
        </Stack>
      </Box>
    </Box>
  );
};

export default EventCard;
