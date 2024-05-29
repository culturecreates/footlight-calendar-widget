import React, { useContext, useState } from 'react';
import { dateRangeFormatter } from '../../utils/dateRangeFormatter';
import placeImg from '../../assets/Location.svg';
import { ReactComponent as DefaultImg } from '../../assets/Vector.svg';
import './card.css';
import { redirectionHandler } from '../../utils/redirectionHandler';
import WidgetContext from '../../context/WidgetContext';

const Card = ({ id, name, place, image, startDate, endDate }) => {
  const [imgError, setImgError] = useState(false);
  const { widgetProps } = useContext(WidgetContext);
  const { calendar } = widgetProps;

  let redirectionUrl = `${process.env.REACT_APP_API_URL}resource/${id}?calendar=${calendar}`;

  return (
    <li
      className="card"
      onClick={(e) => {
        e.preventDefault();
        redirectionHandler({
          url: redirectionUrl,
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
