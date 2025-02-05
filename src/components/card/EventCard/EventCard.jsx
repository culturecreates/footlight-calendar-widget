import React from 'react';
import { Box, Image, Heading, Stack, Text, useBreakpointValue, Flex } from '@chakra-ui/react';
import EventTypeBadge from '../../badge/EventTypeBadge/EventTypeBadge';
import DateBadge from '../../badge/DateBadge/DateBadge';
import StageIcon from '../../../assets/LocationPin.svg';
import { dateRangeFormatter } from '../../../utils/dateRangeFormatter';

const EventCard = React.memo(
  ({ image, eventName, stageName, eventType = [], startDate, altText }) => {
    const cardWidth = useBreakpointValue({ base: '100%', sm: '48%', md: '32%', lg: '30%' });

    return (
      <Box
        flex="1 1 auto"
        width={cardWidth}
        maxWidth="640px"
        minWidth="250px"
        borderRadius="10px"
        overflow="hidden"
        mb={4}
      >
        <Image src={image} alt={altText} width="100%" />

        <Box p={4} bg="var(--event-card-bg)">
          <Stack spacing={3}>
            <Heading
              as="h3"
              size="md"
              noOfLines={2}
              isTruncated
              fontSize="var(--secondary-font-weight)"
            >
              {eventName}
            </Heading>

            <Flex
              justify="flex-start"
              align="flex-start"
              direction={'column'}
              wrap="nowrap"
              gap={2}
            >
              <DateBadge startDate={dateRangeFormatter(startDate)} />
              <Flex align="center" justify={'center'} ml="2px" gap={1}>
                <Image src={StageIcon} alt="Stage Icon" boxSize={'14px'} />
                <Text
                  fontSize="13px"
                  fontWeight="500"
                  color="var(--title-grey)"
                  noOfLines={1}
                  isTruncated
                  ml="2px"
                >
                  {stageName}
                </Text>
              </Flex>
            </Flex>

            <Flex wrap="wrap" spacing={3} justify="flex-start" gap={2}>
              <EventTypeBadge eventType={eventType} />
            </Flex>
          </Stack>
        </Box>
      </Box>
    );
  },
);

EventCard.displayName = 'EventCard';
export default EventCard;
