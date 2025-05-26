import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Text, Icon } from '@chakra-ui/react';
import Avatar from '../../assets/avatar.svg?react';
import './noResult.css';

const NoResult = () => {
  const { t } = useTranslation();

  return (
    <Box
      className="no-content"
      style={{
        width: '100%',
        height: '100%',
        minHeight: '350px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
      }}
    >
      <Icon as={Avatar} style={{ width: '40px', height: '40px' }} />
      <Text
        style={{
          fontSize: 'var(--secondary-font-weight)',
          fontWeight: 400,
          lineHeight: '16px',
          textAlign: 'center',
          color: 'var(--primary-grey)',
        }}
      >
        {t('noResults')}
      </Text>
    </Box>
  );
};

export default NoResult;
