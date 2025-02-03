import React from 'react';
import { Badge } from '@chakra-ui/react';

const DateBadge = ({ startDate }) => (
  <Badge
    fontSize="13px"
    fontWeight="600"
    color="#FFFFFF"
    bg="#3D3CE1"
    borderRadius="5px"
    px={2}
    py={1}
  >
    {startDate}
  </Badge>
);

export default DateBadge;
