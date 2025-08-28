import React, { useContext, useEffect, useState } from 'react';
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

const RelatedEventsCard = ({ dependencyIds, relationType, relationParam, currentEventId }) => {
  const { widgetProps, setError, relatedEventsData, setRelatedEventsData } =
    useContext(WidgetContext);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  let relatedEventsLimit = useSize('#calendar-widget .calendar-widget-details-modal', 550) ? 2 : 4;

  useEffect(() => {
    if (!Array.isArray(dependencyIds) || !dependencyIds?.length) {
      setRelatedEventsData([]);
      setIsLoading(false);
      return;
    }

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
        if (!response?.ok) {
          setIsLoading(false);
          setError(true);
          return;
        }
        const { data } = await response.json();
        const filteredData = data?.filter((event) => event?.id !== currentEventId);

        setIsLoading(false);
        setRelatedEventsData((prev) => ({
          ...prev,
          [relationType]: {
            ids: dependencyIds,
            data: transformData({ data: filteredData, locale: widgetProps?.locale || 'en' }),
          },
        }));
      } catch (error) {
        console.error('Error fetching related events:', error);
        setError(true);
        setIsLoading(false);
      }
    };

    if (haveSameElements(relatedEventsData[relationType]?.ids, dependencyIds)) {
      setIsLoading(false);
      return;
    }

    fetchData();
  }, [dependencyIds]);

  function haveSameElements(arr1, arr2) {
    if (arr1?.length !== arr2?.length) return false;

    let countOccurrences = (arr) => {
      let map = new Map();
      for (let item of arr) {
        map.set(item, (map.get(item) || 0) + 1);
      }
      return map;
    };

    let map1 = countOccurrences(arr1);
    let map2 = countOccurrences(arr2);

    if (map1.size !== map2.size) return false; // Different unique elements

    for (let [key, value] of map1) {
      if (map2.get(key) !== value) return false; // Check frequency match
    }

    return true;
  }

  return (
    <div className="related-events-card-section">
      {(isLoading || relatedEventsData[relationType]?.data.length > 0) && (
        <Heading as="h3" className="section-headings">
          {t('detailsModal.similarEvents')}
        </Heading>
      )}

      <div className="card-container">
        {isLoading && (
          <LoadingCard
            count={relatedEventsLimit}
            styles={{
              wrapper: {
                width: '100%',
                padding: '16px',
                boxShadow: 'var(--primary-box-shadow)',
                borderRadius: 'lg',
                backgroundColor: 'var(--primary-white-opaque)',
              },
            }}
          />
        )}

        {!isLoading &&
          relatedEventsData[relationType]?.data?.map((data, index) => (
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
          ))}
      </div>
    </div>
  );
};

export default RelatedEventsCard;
