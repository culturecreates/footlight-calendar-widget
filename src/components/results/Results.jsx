import React, { useContext } from 'react';
import WidgetContext from '../../context/WidgetContext';
import EventCard from '../card/EventCard/EventCard'; // Import the new EventCard
import './results.css';
// import { cleanDescription } from '../../utils/cleanDescription';

const Results = () => {
  const { data } = useContext(WidgetContext);

  return (
    <ul className="card-container">
      {data?.length > 0 &&
        data.map((item, index) => (
          <EventCard
            key={index}
            image={item?.image}
            eventName={item?.title}
            stageName={item?.place}
            eventType={item?.eventType}
            startDate={item?.startDate}
          />
        ))}
    </ul>
  );
};

export default Results;
