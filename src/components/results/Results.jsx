import React, { useContext } from 'react';
import { Button, Icon, VStack } from '@chakra-ui/react';
import WidgetContext from '../../context/WidgetContext';
import EventCard from '../card/EventCard/EventCard';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ArrowDownIcon } from '../../assets/ArrowDown.svg';

const Results = () => {
  const { data, lastPageFlag, fetchMoreData } = useContext(WidgetContext);
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
          onClick={fetchMoreData}
          mt={4}
          color="var(--strong-grey)"
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
