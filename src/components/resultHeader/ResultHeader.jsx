import React, { useContext } from "react";
import WidgetContext from "../../context/WidgetContext";
import { dateRangeFormatter } from "../../utils/dateRangeFormatter";
import "./resultHeader.css";

const ResultHeader = () => {
  const { searchKeyWord, startDateSpan, endDateSpan, totalCount } = useContext(WidgetContext);
  const isSearchEmpty = !searchKeyWord || searchKeyWord.trim() === "";

  const isDateRangePresent = startDateSpan && endDateSpan;

  let dateText = "";
  if (isDateRangePresent) {
    dateText =
      " - " + endDateSpan && startDateSpan !== endDateSpan
        ? dateRangeFormatter(startDateSpan, endDateSpan)
        : dateRangeFormatter(startDateSpan);
  }
  return (
    <>
      <div className="result-header">
        {isSearchEmpty && (
          <p>{totalCount > 0 ? `Upcoming ${totalCount} events` : "No events present"}</p>
        )}

        {!isSearchEmpty && (
          <p>
            {totalCount > 0
              ? ` ${totalCount} events containing "${searchKeyWord}" ${dateText}`
              : "No events present"}
          </p>
        )}
      </div>
    </>
  );
};

export default ResultHeader;
