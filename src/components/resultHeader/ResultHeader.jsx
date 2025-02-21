import React from 'react';
import { Box, Text, Icon } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ShareIcon } from '../../assets/share.svg';
import './resultHeader.css';
import SocialMediaPopup from '../sharePopup/SharePopup';

const ResultHeader = () => {
  const { t } = useTranslation();

  return (
    <Box className="result-header">
      <Text
        style={{
          color: '#000000',
          fontSize: 'var(--secondary-font-weight)',
          fontWeight: 600,
          lineHeight: '21.14px',
          textAlign: 'left',
          textUnderlinePosition: 'from-font',
          textDecorationSkipInk: 'none',
        }}
      >
        {t('resultHeader.upcoming')}
      </Text>

      <SocialMediaPopup>
        <Icon
          className="result-header-icon"
          as={ShareIcon}
          style={{
            color: '#000000',
            cursor: 'pointer',
            width: '35px',
            height: '35px',
            borderRadius: '50%',
            transition: 'background-color 0.3s ease',
          }}
        />
      </SocialMediaPopup>
    </Box>
  );
};

export default ResultHeader;
