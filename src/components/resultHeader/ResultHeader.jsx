import React from 'react';
import { Box, Text, Icon } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as shareIcon } from '../../assets/share.svg';
import './resultHeader.css';

const ResultHeader = () => {
  const { t } = useTranslation();

  return (
    <Box className="result-header">
      <Text className="header-text">{t('resultHeader.upcoming')}</Text>
      <Icon as={shareIcon} className="share-icon" />
    </Box>
  );
};

export default ResultHeader;
