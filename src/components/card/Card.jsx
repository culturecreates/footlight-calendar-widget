import React, { Suspense, useState } from 'react';
import { dateRangeFormatter } from '../../utils/dateRangeFormatter';
import { ReactComponent as PlaceImg } from '../../assets/Location.svg';
import { ReactComponent as DefaultImg } from '../../assets/Vector.svg';
import './card.css';
import useRedirection from '../../utils/hooks/useRedirection';
import { urlTypes } from '../../constants/generalConstants';
import Loader from '../loader/Loader';
import EventDetailsModal from '../Modal/EventDetailsModal';

const Card = ({
  id,
  name,
  place,
  image,
  startDate,
  endDate,
  performers,
  description,
  scheduleTimezone,
}) => {
  const [imgError, setImgError] = useState(false);
  const { handleRedirection, isOpen, onClose } = useRedirection();

  const handleClick = (e) => {
    e.preventDefault();
    handleRedirection({ id, type: urlTypes.EVENT_DETAILS });
  };

  return (
    <>
      <li className="card" onClick={handleClick}>
        <div className="image-column">
          {!imgError ? (
            <img
              src={image}
              onError={() => {
                setImgError(true);
              }}
            />
          ) : (
            <div className="default-img-container">
              <DefaultImg />
            </div>
          )}
        </div>
        <div className="info-column">
          <div className="name">{name}</div>
          <div className="date">{dateRangeFormatter(startDate, endDate, scheduleTimezone)}</div>
          {place ? (
            <div className="place">
              <PlaceImg />
              {place}
            </div>
          ) : (
            <div style={{ height: 16 }}></div>
          )}
        </div>
      </li>
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <EventDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          name={name}
          place={place}
          image={image}
          performers={performers}
          description={description}
          date={dateRangeFormatter(startDate, endDate, scheduleTimezone)}
        />
      </Suspense>
    </>
  );
};

export default Card;
