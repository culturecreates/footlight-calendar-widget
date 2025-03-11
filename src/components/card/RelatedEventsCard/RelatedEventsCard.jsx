import React, { memo, useContext, useEffect, useState } from 'react';
import WidgetContext from '../../../context/WidgetContext';
import { generateUrl } from '../../../utils/generateUrl';
import { entityTypes, redirectionModes } from '../../../constants/generalConstants';
import { transformData } from '../../../utils/transformData';
import EventCard from '../EventCard/EventCard';
import useSize from '../../../utils/hooks/useSize';
import './relatedEventsCard.css';
import LoadingCard from '../LoadingCard/LoadingCard';
import { Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const RelatedEventsCard = memo(
  ({ dependencyIds = [], relationType, relationParam }) => {
    const { widgetProps, setError, relatedEventsData, setRelatedEventsData } =
      useContext(WidgetContext);
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useTranslation();

    let relatedEventsLimit = useSize('#calendar-widget .calendar-widget-details-modal', 550)
      ? 2
      : 4;

    useEffect(() => {
      if (!dependencyIds.length) return;

      const fetchData = async () => {
        setIsLoading(true);
        const dynamicFilters = dependencyIds.reduce((acc, id) => {
          acc[relationParam] = id;
          return acc;
        }, {});
        const url = generateUrl({
          ...{ ...widgetProps, limit: relatedEventsLimit },
          searchEntityType: entityTypes.EVENTS,
          pageNumber: 1,
          dynamicFilters,
        });

        try {
          const response = await fetch(url);
          if (!response.ok) {
            setError(true);
            return;
          }
          const { data } = await response.json();
          setIsLoading(false);
          setRelatedEventsData((prev) => ({
            ...prev,
            [relationType]: {
              ids: dependencyIds,
              data: transformData({ data, locale: widgetProps?.locale || 'en' }),
            },
          }));
        } catch (error) {
          console.error('Error fetching related events:', error);
          setError(true);
          setIsLoading(false);
        }
      };

      fetchData();
    }, []);

    return (
      <div className="related-events-card-section">
        <Heading as="h3" className="section-headings">
          {t('detailsModal.alsoPlaying')}
        </Heading>
        {isLoading && <LoadingCard count={relatedEventsLimit} />}
        {!isLoading &&
          relatedEventsData[relationType].data?.map((data, index) => {
            return (
              <EventCard
                key={index}
                image={data?.image?.thumbnail}
                eventName={data?.title}
                stageName={data?.place}
                eventType={data?.eventTypes}
                startDate={data?.startDate}
                endDate={data?.endDate}
                scheduleTimezone={data?.scheduleTimezone}
                id={data?.id}
                redirectionMode={redirectionModes.NONE}
                calendar={widgetProps?.calendar}
                altText={data?.imageCredit?.description || ''}
              />
            );
          })}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.dependencyIds === nextProps.dependencyIds;
  },
);

RelatedEventsCard.displayName = 'RelatedEventsCard';

export default RelatedEventsCard;
