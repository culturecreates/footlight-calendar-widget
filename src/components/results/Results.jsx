import React, { useContext } from 'react';
import { Button, Icon, VStack } from '@chakra-ui/react';
import WidgetContext from '../../context/WidgetContext';
import EventCard from '../card/EventCard/EventCard';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ArrowDownIcon } from '../../assets/ArrowDown.svg';
import { onLoadMoreClick } from '../../utils/onLoadMoreClick';

const Results = () => {
  const { data, lastPageFlag, getData, pageNumber, widgetProps } = useContext(WidgetContext);
  const { limit, redirectionMode, locale, calendar } = widgetProps;

  const { t } = useTranslation();

  return (
    <VStack spacing={4} overflowY="scroll" height="100%" align="center">
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
          mt={4}
          color="var(--tertiary-black)"
          _hover={{ textDecoration: 'underline' }}
        >
          {t('loadMore')}
          <Icon as={ArrowDownIcon} ml={2} />
        </Button>
      )}
    </VStack>
  );
};

export default Results;
