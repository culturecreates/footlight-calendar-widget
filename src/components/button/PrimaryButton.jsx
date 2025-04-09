import React from 'react';
import { Button } from '@chakra-ui/react';

const PrimaryButton = ({ label, Icon, style = {}, ...rest }) => {
  return (
    <Button
      style={{
        backgroundColor: '#319795',
        color: '#fff',
        borderRadius: '6px',
        padding: '0.75rem 1.25rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        ...style,
      }}
      {...rest}
    >
      {Icon && (
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Icon />
        </span>
      )}
      {label}
    </Button>
  );
};

export default PrimaryButton;
