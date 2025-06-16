import React, { useContext } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import WidgetContext from '../../context/WidgetContext';
import { getRedirectionUrl, redirectionHandler } from '../../utils/redirectionHandler';

const Footer = () => {
  const { widgetProps, calendarData } = useContext(WidgetContext);
  const { showFooter, locale, footerText, showFooterLogo } = widgetProps;

  const { logo } = calendarData;

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
        <Flex gap={2} alignItems="center" justifyContent="center">
          <Box>
            <Text
              fontSize="14px"
              lineHeight="17.07px"
              fontWeight="600"
              color="var(--secondary-black)"
            >
              {footerText || ''}
            </Text>
          </Box>
          {showFooterLogo && (
            <Box display="flex" style={{ cursor: 'pointer' }} justifyContent="center">
              <Image src={logo} onClick={onLogoClickHandler} alt="Calendar Logo" height="27px" />
            </Box>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
