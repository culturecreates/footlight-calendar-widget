import React, { useContext } from "react";
import WidgetContext from "../../context/WidgetContext";
import Card from "../card/Card";

import "./results.css";

const Results = () => {
  const { data } = useContext(WidgetContext);
  const screenHeight = window.screen.height - 270;
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
