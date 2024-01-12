import React, { useState } from 'react';
import { dateRangeFormatter } from '../../utils/dateRangeFormatter';
import placeImg from '../../assets/Location.svg';
import { ReactComponent as DefaultImg } from '../../assets/Vector.svg';
import './card.css';

const Card = ({ name, place, image, startDate, endDate }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <li className="card">
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
