import React from 'react';
import {
  Box,
  Image,
  Heading,
  Stack,
  Text,
  Flex,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import EventTypeBadge from '../badge/EventTypeBadge/EventTypeBadge';
import DateBadge from '../badge/DateBadge/DateBadge';
import StageIcon from '../../assets/locationPin.svg';
import { dateRangeFormatter } from '../../utils/dateRangeFormatter';
import EventDetailsModal from '../detailsModal/EventDetailsModal';

const EventCard = React.memo(
  ({ image, eventName, stageName, eventType = [], startDate, altText, id }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cardWidth = useBreakpointValue({ base: '100%', sm: '48%', md: '32%', lg: '30%' });

    return (
      <>
        <Box
          flex="1 1 auto"
          width={cardWidth}
          maxWidth="640px"
          minWidth="250px"
          borderRadius="10px"
          overflow="hidden"
          onClick={onOpen}
          cursor="pointer"
        >
          <Image src={image} alt={altText} width="100%" />

          <Box p={4} bg="var(--bg-grey)">
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

              <Flex direction="column" gap={2}>
                <DateBadge startDate={dateRangeFormatter(startDate)} />
                <Flex align="center" gap={1}>
                  <Image src={StageIcon} alt="Stage Icon" boxSize="14px" />
                  <Text
                    fontSize="13px"
                    fontWeight="500"
                    color="var(--title-grey)"
                    noOfLines={1}
                    isTruncated
                  >
                    {stageName}
                  </Text>
                </Flex>
              </Flex>

              <Flex wrap="wrap" gap={2}>
                {eventType.length > 0 && <EventTypeBadge eventType={eventType[0]} />}
              </Flex>
            </Stack>
          </Box>
        </Box>
        <EventDetailsModal isOpen={isOpen} onClose={onClose} eventId={id} />
      </>
    );
  },
);

EventCard.displayName = 'EventCard';
export default EventCard;
