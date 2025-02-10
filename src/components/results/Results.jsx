import React, { useContext } from 'react';
import { Box, Button, Icon } from '@chakra-ui/react';
import WidgetContext from '../../context/WidgetContext';
import EventCard from '../card/EventCard/EventCard';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ArrowDownIcon } from '../../assets/arrowDown.svg';
import { onLoadMoreClick } from '../../utils/onLoadMoreClick';

const Results = () => {
  const { data, lastPageFlag, getData, pageNumber, widgetProps } = useContext(WidgetContext);
  const { limit, redirectionMode, locale, calendar } = widgetProps;

  const { t } = useTranslation();

  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        base: '371px',
        sm: 'repeat(2, 246px)',
        md: 'repeat(3, 246px)',
        lg: 'repeat(4, 246px)',
      }}
      gap={4}
    >
      {data?.map((item, index) => (
        <EventCard
          key={index}
          image={item?.image}
          eventName={item?.title}
          stageName={item?.place}
          eventType={item?.eventTypes}
          startDate={item?.startDate}
        />
      ))}
      {lastPageFlag && (
        <Button
          variant="link"
          onClick={() =>
            onLoadMoreClick({ getData, pageNumber, limit, redirectionMode, locale, calendar })
          }
          pt={6}
          pb={5}
          color="var(--tertiary-black)"
          _hover={{ textDecoration: 'underline' }}
        >
          {t('loadMore')}
          <Icon as={ArrowDownIcon} ml={2} />
        </Button>
      )}
    </Box>
  );
};

export default Results;
