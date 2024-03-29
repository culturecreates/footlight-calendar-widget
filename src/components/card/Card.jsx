import React, { useContext, useState } from 'react';
import { dateRangeFormatter } from '../../utils/dateRangeFormatter';
import placeImg from '../../assets/Location.svg';
import { ReactComponent as DefaultImg } from '../../assets/Vector.svg';
import './card.css';
import { redirectionHandler } from '../../utils/redirectionHandler';
import WidgetContext from '../../context/WidgetContext';

const Card = ({ id, slug, name, place, image, startDate, endDate }) => {
  const [imgError, setImgError] = useState(false);
  const { widgetProps } = useContext(WidgetContext);
  const { eventUrl, locale } = widgetProps;

  let url = eventUrl.replace('${locale}', locale).replace('${eventId}', id);

  if (url.includes('${eventName}')) {
    url = url.replace('${eventName}', slug);
  }

  return (
    <li
      className="card"
      onClick={(e) => {
        e.preventDefault();
        redirectionHandler({
          url,
        });
      }}
    >
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
        <div className="date">{dateRangeFormatter(startDate, endDate)}</div>
        {place ? (
          <div className="place">
            <img src={placeImg} alt="place"></img>
            {place}
          </div>
        ) : (
          <div style={{ height: 16 }}></div>
        )}
      </div>
    </li>
  );
};

export default Card;
