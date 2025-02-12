import React from 'react';
import { Box, Text, Icon } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ShareIcon } from '../../assets/share.svg';

const ResultHeader = () => {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p="0px 24px 16px 24px"
      maxW={{
        sm: '717px',
        md: '717px',
        lg: '981px',
      }}
      w="100%"
    >
      <Text
        css={{
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
      <Icon
        as={ShareIcon}
        css={{
          color: '#000000',
          cursor: 'pointer',
          width: '35px',
          height: '35px',
          borderRadius: '50%',
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: 'var(--dynamic-color-100)',
          },
        }}
      />
    </Box>
  );
};

export default ResultHeader;
