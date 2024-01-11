import { createContext, useCallback, useEffect, useState } from "react";
import { entityTypes } from "../constants/entityTypes";
import { sessionStorageVariableNames } from "../constants/sessionStorageVariableNames";
import { generateUrl } from "../utils/generateUrl";
import { transformData } from "../utils/transformData";

const WidgetContext = createContext(undefined);

export const WidgetContextProvider = ({ widgetProps, children }) => {
  // states
  const [data, setData] = useState();
  const [totalCount, setTotalCount] = useState();
  const [error, setError] = useState();
  const [searchKeyWord, setSearchKeyWord] = useState();

  const [searchDate, setSearchDate] = useState();
  const [startDateSpan, setStartDateSpan] = useState(
    sessionStorage.getItem(sessionStorageVariableNames.WidgetStartDate),
  );
  const [endDateSpan, setEndDateSpan] = useState(
    sessionStorage.getItem(sessionStorageVariableNames.WidgetEndDate),
  );

  const [isSingleDate, setIsSingleDate] = useState();

  const getData = useCallback(async () => {
    try {
      const url = generateUrl({
        ...widgetProps,
        searchEntityType: entityTypes.EVENTS,
        searchKeyWord,
        startDateSpan,
        endDateSpan,
      });
      const response = await fetch(url);
      const { data, meta } = await response.json();

      setData(transformData({ data, locale: widgetProps?.locale || "en" }));
      setTotalCount(meta?.totalCount);
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    }
  }, [widgetProps, searchKeyWord, startDateSpan, endDateSpan]);

  useEffect(() => {
    getData();
  }, [widgetProps, searchKeyWord, startDateSpan, endDateSpan]);

  return (
    <WidgetContext.Provider
      value={{
        widgetProps,
        data,
        totalCount,
        error,
        searchKeyWord,
        searchDate,
        startDateSpan,
        endDateSpan,
        isSingleDate,
        getData,
        setSearchKeyWord,
        setSearchDate,
        setStartDateSpan,
        setEndDateSpan,
        setIsSingleDate,
      }}
    >
      {children}
    </WidgetContext.Provider>
  );
};

export default WidgetContext;
