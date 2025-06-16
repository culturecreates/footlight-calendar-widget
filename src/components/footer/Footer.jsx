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
      height="auto"
      flexDirection="column"
      gap={2}
      px={5}
      backgroundColor="var(--bg-grey)"
    >
      <Flex
        direction="column"
        gap={2}
        py={2}
        align="center"
        textAlign="center"
        width="fit-content"
        mx="auto"
      >
        <Text fontSize="14px" lineHeight="17.07px" fontWeight="600" color="var(--secondary-black)">
          {footerText || ''}
        </Text>

        {showFooterLogo && (
          <Box display="flex" alignItems="center" cursor="pointer" onClick={onLogoClickHandler}>
            <Image src={logo} alt="Calendar Logo" height="27px" />
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default Footer;
