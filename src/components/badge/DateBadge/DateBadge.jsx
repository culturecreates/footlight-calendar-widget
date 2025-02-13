import React from 'react';
import { Badge } from '@chakra-ui/react';

const DateBadge = ({ startDate, color, bgcolor, styles = {} }) => (
  <Badge
    fontSize="13px"
    fontWeight="600"
    color={color ?? 'var(--primary-white-opaque)'}
    bg={bgcolor ?? 'var(--main-dynamic-color)'}
    borderRadius="5px"
    px={2}
    py={1}
    display="inline-flex"
    alignSelf="flex-start"
    {...styles}
  >
    {startDate}
  </Badge>
);

export default DateBadge;
