import React, { useEffect } from 'react';
import EventTypeBadge from '../../badge/EventTypeBadge/EventTypeBadge';
import DateBadge from '../../badge/DateBadge/DateBadge';
import { dateRangeFormatter } from '../../../utils/dateRangeFormatter';
import './eventCard.css';
import { Icon, useDisclosure } from '@chakra-ui/react';
import EventDetailsModal from '../../detailsModal/EventDetailsModal';
import { redirectionModes, urlTypes } from '../../../constants/generalConstants';
import { getRedirectionUrl, redirectionHandler } from '../../../utils/redirectionHandler';
import i18next from 'i18next';
import { trackEventClick } from '../../../utils/googleAnalytics';
import ProgressiveImage from '../../progressiveImage/ProgressiveImage';
import StageIcon from '../../../assets/locationPin.svg?react';
import defaultImage from '../../../assets/defaultImage.svg?react';

const EventCard = React.memo(
  ({
    image,
    eventName,
    stageName,
    eventType = [],
    startDate,
    endDate,
    altText,
    id,
    scheduleTimezone,
    eventIdSearchParam,
    redirectionMode,
    calendar,
  }) => {
    const redirectionFlag = redirectionMode === redirectionModes.EXTERNAL;
    const locale = i18next.language;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const onClickHandler = () => {
      redirectionFlag
        ? redirectionHandler({
            url: getRedirectionUrl({
              id: id,
              type: urlTypes.EVENT,
              locale,
              calendar,
            }),
          })
        : onOpen();
      trackEventClick(calendar, id);
    };

    useEffect(() => {
      if (eventIdSearchParam && eventIdSearchParam === id) onOpen();
    }, [eventIdSearchParam, id]);

    return (
      <>
        <div className="event-card" onClick={onClickHandler}>
          <ProgressiveImage
            highRes={image}
            alt={altText}
            style={{ width: '100%', height: '100%', display: 'block' }}
            onErrorPlaceholder={defaultImage}
            aspectRatioType="thumbnail"
            parentCalssName=".event-card"
          />

          <div
            style={{
              padding: '16px',
              backgroundColor: 'var(--bg-grey)',
              height: 'auto',
              flex: '1',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3
                style={{
                  fontSize: 'var(--secondary-font-weight)',
                  fontWeight: 'bold',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  maxWidth: '100%',
                  lineHeight: '1.4em',
                  maxHeight: 'calc(1.4em * 2)',
                }}
              >
                {eventName}
              </h3>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '8px',
                }}
              >
                <DateBadge
                  startDate={dateRangeFormatter({ startDate, endDate, scheduleTimezone })}
                />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginLeft: '2px',
                    width: '100%',
                  }}
                >
                  <Icon as={StageIcon} alt="Stage icon" style={{ width: '14px', height: '14px' }} />
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: '500',
                      color: 'var(--title-grey)',
                      marginLeft: '2px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '100%',
                    }}
                  >
                    {stageName}
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                {eventType.length > 0 && <EventTypeBadge eventType={eventType[0]} />}
              </div>
            </div>
          </div>
        </div>
        <EventDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          eventId={id}
          scheduleTimezone={scheduleTimezone}
        />
      </>
    );
  },
);

EventCard.displayName = 'EventCard';
export default EventCard;
