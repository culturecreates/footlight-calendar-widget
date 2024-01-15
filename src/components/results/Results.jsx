import React, { useContext } from 'react';
import { displayTypes } from '../../constants/generalConstants';
import WidgetContext from '../../context/WidgetContext';
import Card from '../card/Card';

import './results.css';

const Results = () => {
  const { data, displayType } = useContext(WidgetContext);
  const screenHeight =
    displayType === displayTypes.DESKTOP ? window.screen.height - 275 : window.screen.height - 350;
  return (
    <ul className="card-container" style={{ maxHeight: screenHeight }}>
      {data?.length > 0 &&
        data.map((item, index) => (
          <Card
            key={index}
            name={item?.title}
            startDate={item?.startDate}
            endDate={item?.endDate}
            place={item?.streetAddress}
            image={item?.image}
          />
        ))}
    </ul>
  );
};

export default Results;
