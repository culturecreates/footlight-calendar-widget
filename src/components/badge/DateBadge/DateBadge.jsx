import React from 'react';
import { Badge } from '@chakra-ui/react';

const DateBadge = ({ startDate }) => (
  <Badge
    fontSize="13px"
    fontWeight="600"
    color="var(--date-badge-text)"
    bg="var(--date-badge-bg)"
    borderRadius="5px"
    px={2}
    py={1}
  >
    {startDate}
  </Badge>
);

export default DateBadge;
