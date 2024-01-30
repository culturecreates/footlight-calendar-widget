import React, { useContext } from 'react';
import { displayTypes } from '../../constants/generalConstants';
import WidgetContext from '../../context/WidgetContext';
import Card from '../card/Card';

import './results.css';

const Results = () => {
  const { data } = useContext(WidgetContext);

  return (
    <ul className="card-container">
      {data?.length > 0 &&
        data.map((item, index) => (
          <Card
            key={index}
            id={item?.id}
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
