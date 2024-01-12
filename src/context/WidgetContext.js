import { createContext, useCallback, useEffect, useState } from 'react';
import { entityTypes } from '../constants/generalConstants';
import { sessionStorageVariableNames } from '../constants/sessionStorageVariableNames';
import { generateUrl } from '../utils/generateUrl';
import { useSize } from '../utils/hooks/useSize';
import { transformData } from '../utils/transformData';

const WidgetContext = createContext(undefined);

export const WidgetContextProvider = ({ widgetProps, children }) => {
  // states
  const [data, setData] = useState();
  const [totalCount, setTotalCount] = useState();
  const [error, setError] = useState();
  const [searchKeyWord, setSearchKeyWord] = useState('');
  const [searchDate, setSearchDate] = useState();
  const [startDateSpan, setStartDateSpan] = useState(
    sessionStorage.getItem(sessionStorageVariableNames.WidgetStartDate),
  );
  const [endDateSpan, setEndDateSpan] = useState(
    sessionStorage.getItem(sessionStorageVariableNames.WidgetEndDate),
  );
  const [isSingleDate, setIsSingleDate] = useState();
  const [calendarModalToggle, setCalendarModalToggle] = useState(false); // controls calendar as modal for mobile view
  const [isLoading, setIsLoading] = useState(true);

  const displayType = useSize();

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

      setData(transformData({ data, locale: widgetProps?.locale || 'en' }));
      setTotalCount(meta?.totalCount);
      setIsLoading(false);
    } catch (error) {
      setError('Error fetching data');
      console.error('Error fetching data:', error);
    }
  }, [widgetProps, searchKeyWord, startDateSpan, endDateSpan]);

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, [widgetProps, searchKeyWord, startDateSpan, endDateSpan]);

  useEffect(() => {
    calendarModalToggle && setCalendarModalToggle(false);
  }, [startDateSpan, endDateSpan]);

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
        displayType,
        calendarModalToggle,
        isLoading,
        getData,
        setSearchKeyWord,
        setSearchDate,
        setStartDateSpan,
        setEndDateSpan,
        setIsSingleDate,
        setCalendarModalToggle,
      }}
    >
      {children}
    </WidgetContext.Provider>
  );
};

export default WidgetContext;
