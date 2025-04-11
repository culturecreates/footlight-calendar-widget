import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import WidgetContext from '../../context/WidgetContext';
import { getLocalized } from '../../utils/getLocalized';
import { getRedirectionUrl, redirectionHandler } from '../../utils/redirectionHandler';

const Footer = () => {
  const { t } = useTranslation();
  const { widgetProps, calendarData } = useContext(WidgetContext);
  const { showFooter, locale } = widgetProps;
  const { logo, name } = calendarData;
  const calendarName = getLocalized(name, locale);

  if (!showFooter) return null;

  const onLogoClickHandler = () => {
    const { calendar } = widgetProps;
    const url = getRedirectionUrl({ calendar, locale });
    redirectionHandler({ url });
  };
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
      <Flex direction="column" gap={2} textAlign="center">
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
          <Box display="flex" style={{ cursor: 'pointer' }} justifyContent="center">
            <Image src={logo} onClick={onLogoClickHandler} alt="Calendar Logo" height="27px" />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
