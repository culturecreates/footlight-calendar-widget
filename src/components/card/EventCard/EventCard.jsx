import React from 'react';
import EventTypeBadge from '../../badge/EventTypeBadge/EventTypeBadge';
import DateBadge from '../../badge/DateBadge/DateBadge';
import { ReactComponent as StageIcon } from '../../../assets/locationPin.svg';
import { dateRangeFormatter } from '../../../utils/dateRangeFormatter';
import './eventCard.css';
import { Icon } from '@chakra-ui/react';

const EventCard = React.memo(
  ({ image, eventName, stageName, eventType = [], startDate, altText }) => {
    return (
      <div className="event-card">
        <img src={image} alt={altText} style={{ width: '100%', display: 'block' }} />

        <div style={{ padding: '16px', backgroundColor: 'var(--bg-grey)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3
              style={{
                fontSize: 'var(--secondary-font-weight)',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100%',
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
              <DateBadge startDate={dateRangeFormatter(startDate)} />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginLeft: '2px',
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
    );
  },
);

EventCard.displayName = 'EventCard';
export default EventCard;
