import React from 'react';
import { Badge } from '@chakra-ui/react';

const DateBadge = ({ startDate, color }) => (
  <Badge
    style={{
      fontSize: '13px',
      fontWeight: '600',
      color: color ?? 'var(--primary-white-opaque)',
      backgroundColor: 'var(--dynamic-color-700)',
      borderRadius: '5px',
      paddingLeft: '8px',
      paddingRight: '8px',
      paddingTop: '4px',
      paddingBottom: '4px',
      display: 'inline-flex',
      alignSelf: 'flex-start',
    }}
  >
    {startDate}
  </Badge>
);

export default DateBadge;
