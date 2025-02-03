import React from 'react';
import { Badge } from '@chakra-ui/react';

const EventTypeBadge = ({ eventType }) => (
  <Badge
    fontSize="13px"
    fontWeight="500"
    color="var(--event-type-badge-text)"
    bg="var(--event-type-badge-bg)"
    borderRadius="24px"
    px={3}
    py={1}
  >
    {eventType}
  </Badge>
);

export default EventTypeBadge;
