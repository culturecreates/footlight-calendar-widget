import React from 'react';
import { Badge } from '@chakra-ui/react';

const EventTypeBadge = ({ eventType, color }) => (
  <Badge
    fontSize="13px"
    fontWeight="500"
    color="var(--primary-white-opaque)"
    bg={color ?? 'var(--secondary-grey)'}
    borderRadius="24px"
    px={3}
    py={1}
  >
    {eventType}
  </Badge>
);

export default EventTypeBadge;
