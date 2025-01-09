import React, { useContext } from 'react';
import WidgetContext from '../../context/WidgetContext';
import Card from '../card/Card';
import './results.css';
import { cleanDescription } from '../../utils/cleanDescription';

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
            scheduleTimezone={item?.scheduleTimezone}
            slug={item?.slug}
            startDate={item?.startDate}
            endDate={item?.endDate}
            place={item?.place}
            image={item?.image}
            performers={item?.performers}
            description={cleanDescription(item?.description)}
          />
        ))}
    </ul>
  );
};

export default Results;
