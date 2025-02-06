import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import WidgetContext from '../../context/WidgetContext';

const Footer = () => {
  const { t } = useTranslation();
  const { widgetProps, calendarData } = useContext(WidgetContext);
  const { showFooter, calendarLogo, locale } = widgetProps;
  const calendarName =
    calendarData?.name?.[locale] || calendarData?.name?.en || calendarData?.name?.fr;

  if (!showFooter) return null;

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
        <Flex gap={2} alignItems="center" justifyContent="center">
          <Box>
            <Text
              fontSize="14px"
              lineHeight="17.07px"
              fontWeight="600"
              color="var(--secondary-black)"
            >
              {calendarName}
            </Text>
          </Box>
          <Box display="flex" justifyContent="center">
            <Image src={calendarLogo} alt="Calendar Logo" height="27px" />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
