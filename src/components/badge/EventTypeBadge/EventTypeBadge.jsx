import React from 'react';
import { Badge } from '@chakra-ui/react';

const EventTypeBadge = ({ eventType }) => (
  <Badge
    fontSize="13px"
    fontWeight="500"
    color="var(--primary-white-opaque)"
    bg="var(--secondary-grey)"
    borderRadius="24px"
    px={3}
    py={1}
  >
    {eventType}
  </Badge>
);

export default EventTypeBadge;
