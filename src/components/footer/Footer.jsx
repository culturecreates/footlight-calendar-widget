import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import WidgetContext from '../../context/WidgetContext';

const Footer = () => {
  const { t } = useTranslation();
  const { widgetProps } = useContext(WidgetContext);

  if (!widgetProps.showFooter) return null;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={2}
      py={3}
      maxH={100}
      backgroundColor="var(--bg-grey)"
    >
      <Flex direction="column" gap={3} textAlign="center">
        <Text
          fontWeight="300"
          lineHeight="17.07px"
          textUnderlinePosition="from-font"
          color="var(--secondary-black)"
        >
          {t('footer.providedBy')}
        </Text>
        <Box display="flex" justifyContent="center">
          <Image src={widgetProps?.calendarLogo} alt="Calendar Logo" height="27px" />
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
