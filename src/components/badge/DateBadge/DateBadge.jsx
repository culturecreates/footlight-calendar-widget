import React from 'react';
import { Badge } from '@chakra-ui/react';

const DateBadge = ({ startDate, color, bgcolor }) => (
  <Badge
    style={{
      fontSize: '13px',
      fontWeight: '600',
      color: color ?? 'var(--primary-white-opaque)',
      backgroundColor: bgcolor ?? 'var(--main-dynamic-color)',
      borderRadius: '5px',
      paddingLeft: '12px',
      paddingRight: '12px',
      paddingTop: '4px',
      paddingBottom: '4px',
      display: 'inline-flex',
      alignSelf: 'flex-start',
      textWrap: 'auto',
      position: 'relative',
    }}
  >
    {startDate}
  </Badge>
);

export default DateBadge;
