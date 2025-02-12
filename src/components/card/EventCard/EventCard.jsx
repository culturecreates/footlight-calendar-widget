import React from 'react';
import { Box, Image, Heading, Stack, Text, useBreakpointValue, Flex } from '@chakra-ui/react';
import EventTypeBadge from '../../badge/EventTypeBadge/EventTypeBadge';
import DateBadge from '../../badge/DateBadge/DateBadge';
import StageIcon from '../../../assets/locationPin.svg';
import { dateRangeFormatter } from '../../../utils/dateRangeFormatter';

const EventCard = React.memo(
  ({ image, eventName, stageName, eventType = [], startDate, altText }) => {
    const cardWidth = useBreakpointValue({
      base: '371px',
      sm: '246px',
      md: '246px',
      lg: '246px',
    });

    return (
      <Box
        flex="1 1 auto"
        width={cardWidth}
        maxWidth="371px"
        minWidth="246px"
        borderRadius="10px"
        overflow="hidden"
        height={'100%'}
      >
        <Image src={image} alt={altText} width="100%" />

        <Box p={'4px'} bg="var(--bg-grey)">
          <Stack gap={'3px'}>
            <Heading
              as="h3"
              size="md"
              noOfLines={'2'}
              truncate
              fontSize="var(--secondary-font-weight)"
            >
              {eventName}
            </Heading>

            <Flex
              justify="flex-start"
              align="flex-start"
              direction={'column'}
              wrap="nowrap"
              gap={'0.5rem'}
            >
              <DateBadge startDate={dateRangeFormatter(startDate)} />
              <Flex align="center" justify={'center'} ml="2px" gap={'4px'}>
                <Image src={StageIcon} alt="Stage Icon" boxSize={'14px'} />
                <Text
                  fontSize="13px"
                  fontWeight="500"
                  color="var(--title-grey)"
                  noOfLines={'1'}
                  whiteSpace="normal"
                  ml="2px"
                >
                  {stageName}
                </Text>
              </Flex>
            </Flex>

            <Flex wrap="wrap" justify="flex-start" gap={'0.5rem'}>
              {eventType.length > 0 && <EventTypeBadge eventType={eventType[0]} />}
            </Flex>
          </Stack>
        </Box>
      </Box>
    );
  },
);

EventCard.displayName = 'EventCard';
export default EventCard;
