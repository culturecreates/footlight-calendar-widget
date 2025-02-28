import React, { useContext } from 'react';
import WidgetContext from '../../context/WidgetContext';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ArrowDownIcon } from '../../assets/arrowDown.svg';
import { onLoadMoreClick } from '../../utils/onLoadMoreClick';
import './results.css';
import EventCard from '../card/EventCard/EventCard';

const Results = () => {
  const { data, lastPageFlag, getData, pageNumber, widgetProps, eventIdSearchParam } =
    useContext(WidgetContext);
  const { limit, redirectionMode, locale, calendar } = widgetProps;
  const { t } = useTranslation();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="grid-container">
        {data?.map((item, index) => (
          <EventCard
            key={index}
            image={item?.image?.thumbnail}
            eventName={item?.title}
            stageName={item?.place}
            eventType={item?.eventTypes}
            startDate={item?.startDate}
            endDate={item?.endDate}
            scheduleTimezone={item?.scheduleTimezone}
            id={item?.id}
            eventIdSearchParam={eventIdSearchParam}
            redirectionMode={redirectionMode}
            calendar={calendar}
            altText={item?.imageCredit?.description || ''}
          />
        ))}
      </div>

      {lastPageFlag && (
        <button
          onClick={() =>
            onLoadMoreClick({ getData, pageNumber, limit, redirectionMode, locale, calendar })
          }
          style={{
            marginTop: '24px',
            marginBottom: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--tertiary-black)',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {t('loadMore')}
          <ArrowDownIcon style={{ width: '20px', height: '20px' }} />
        </button>
      )}
    </div>
  );
};

export default Results;
