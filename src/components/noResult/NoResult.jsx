import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Text, Icon } from '@chakra-ui/react';
import { ReactComponent as Avatar } from '../../assets/avatar.svg';

const NoResult = () => {
  const { t } = useTranslation();

  return (
    <Box
      width="100%"
      height="100%"
      minHeight="96px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop="100px"
    >
      <Icon as={Avatar} boxSize="40px" />
      <Text
        fontSize="var(--secondary-font-weight)"
        fontWeight="400"
        lineHeight="16px"
        textAlign="center"
        color="var(--primary-grey)"
      >
        {t('noResults')}
      </Text>
    </Box>
  );
};

export default NoResult;
