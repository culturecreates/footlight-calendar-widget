import { createContext, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { entityTypes } from '../constants/generalConstants';
import { getDefaultSessionStorageVariableNames } from '../constants/sessionStorageVariableNames';
import { generateUrl } from '../utils/generateUrl';
import { useSize } from '../utils/hooks/useSize';
import { transformData } from '../utils/transformData';
import { useDebounce } from '../utils/useDebounce';
import { searchDateFormatter } from '../utils/dateRangeFormatter';

const WidgetContext = createContext(undefined);

export const WidgetContextProvider = ({ widgetProps, children }) => {
  const indexedSessionStorageVariableNames = getDefaultSessionStorageVariableNames(
    widgetProps?.index || 1,
  );

  // states
  const [data, setData] = useState();
  const [totalCount, setTotalCount] = useState();
  const [error, setError] = useState();
  const [searchKeyWord, setSearchKeyWord] = useState(
    sessionStorage.getItem(indexedSessionStorageVariableNames.WidgetSearchKeyWord) || '',
  );
  const [searchDate, setSearchDate] = useState(
    searchDateFormatter(
      sessionStorage.getItem(indexedSessionStorageVariableNames.WidgetSearchDate),
    ) || '',
  );
  const [startDateSpan, setStartDateSpan] = useState(
    sessionStorage.getItem(indexedSessionStorageVariableNames.WidgetStartDate) || '',
  );
  const [endDateSpan, setEndDateSpan] = useState(
    sessionStorage.getItem(indexedSessionStorageVariableNames.WidgetEndDate) || '',
  );
  const [isSingleDate, setIsSingleDate] = useState();
  const [calendarModalToggle, setCalendarModalToggle] = useState(false); // controls calendar as modal for mobile view
  const [isLoading, setIsLoading] = useState(true);

  const displayType = useSize();
  const { i18n } = useTranslation();

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

  const getDataDebounced = useDebounce(getData, 500);

  useEffect(() => {
    setIsLoading(true);
    getDataDebounced();
  }, [widgetProps, searchKeyWord, startDateSpan, endDateSpan]);

  useEffect(() => {
    calendarModalToggle && setCalendarModalToggle(false);
  }, [startDateSpan, endDateSpan]);

  useEffect(() => {
    i18n.changeLanguage(widgetProps?.locale);
  }, [i18n, widgetProps?.locale]);

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
        isLoading,
        calendarModalToggle,
        indexedSessionStorageVariableNames,
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
