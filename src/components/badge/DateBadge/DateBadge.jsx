import React from 'react';
import { Badge } from '@chakra-ui/react';

const DateBadge = ({ startDate, color }) => (
  <Badge
    fontSize="13px"
    fontWeight="600"
    color={color ?? 'var(--date-badge-text)'}
    bg="var(--date-badge-bg)"
    borderRadius="5px"
    px={2}
    py={1}
    display="inline-flex"
    alignSelf="flex-start"
  >
    {startDate}
  </Badge>
);

export default DateBadge;
