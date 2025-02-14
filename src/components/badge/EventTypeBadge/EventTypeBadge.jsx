import React from 'react';
import { Badge } from '@chakra-ui/react';

const EventTypeBadge = ({ eventType, color }) => (
  <Badge
    style={{
      fontSize: '13px',
      fontWeight: '500',
      color: 'var(--primary-white-opaque)',
      backgroundColor: color ?? 'var(--secondary-grey)',
      borderRadius: '24px',
      paddingLeft: '12px',
      paddingRight: '12px',
      paddingTop: '4px',
      paddingBottom: '4px',
    }}
  >
    {eventType}
  </Badge>
);

export default EventTypeBadge;
