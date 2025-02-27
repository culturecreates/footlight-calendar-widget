import { createContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getDefaultSessionStorageVariableNames } from '../constants/sessionStorageVariableNames';
import { searchDateFormatter } from '../utils/dateRangeFormatter';
import useFetchEventData from '../utils/hooks/useFetchListingData';
import { generateWidgetUrl } from '../utils/generateUrl';

const WidgetContext = createContext(undefined);

export const WidgetContextProvider = ({ widgetProps, children }) => {
  const indexedSessionStorageVariableNames = getDefaultSessionStorageVariableNames(
    widgetProps?.index || 1,
  );

  const {
    startDateSpan: startDateSpanSearchParam,
    endDateSpan: endDateSpanSearchParam,
    isSingleDate: isSingleDateSearchParam,
    selectedFilters: selectedFiltersSearchParam,
    searchKeyWord: searchKeyWordSearchParam,
    pageNumber: pageNumberSearchParam,
    eventId: eventIdSearchParam,
  } = widgetProps?.internalStateSearchParam || {};

  // states
  const getSessionValue = (key, fallback = '') => {
    const value = sessionStorage.getItem(indexedSessionStorageVariableNames[key]);
    return value !== null && value !== 'null' ? value : fallback;
  };

  const [pageNumber, setPageNumber] = useState(pageNumberSearchParam ?? 1);
  const [isSingleDate, setIsSingleDate] = useState(isSingleDateSearchParam || false);
  const [selectedFilters, setSelectedFilters] = useState(selectedFiltersSearchParam ?? {});
  const [startDateSpan, setStartDateSpan] = useState(
    startDateSpanSearchParam ?? getSessionValue('WidgetStartDate'),
  );
  const [endDateSpan, setEndDateSpan] = useState(
    endDateSpanSearchParam ?? getSessionValue('WidgetEndDate'),
  );
  const [searchKeyWord, setSearchKeyWord] = useState(
    searchKeyWordSearchParam || getSessionValue('WidgetSearchKeyWord'),
  );

  const [data, setData] = useState([]);
  const [displayFiltersFlag, setDisplayFiltersFlag] = useState(false);
  const [error, setError] = useState(false);
  const [calendarModalToggle, setCalendarModalToggle] = useState(false);
  const [calendarData, setCalendarData] = useState([]);

  const [searchDate, setSearchDate] = useState(
    searchDateFormatter(getSessionValue('WidgetSearchDate')),
  );

  const { i18n } = useTranslation();

  const resetFilters = () => {
    setSelectedFilters({});
    setSearchKeyWord('');
    setSearchDate('');
    setStartDateSpan('');
    setEndDateSpan('');
    setIsSingleDate();
    setPageNumber(1);
    setError(false);
  };

  const { isLoading, totalCount, lastPageFlag, getData } = useFetchEventData({
    setData,
    setError,
    setPageNumber,
    widgetProps,
    searchKeyWord,
    startDateSpan,
    endDateSpan,
    selectedFilters,
  });

  const fetchCalendarData = async (calendar) => {
    try {
      const url = generateWidgetUrl(calendar);
      const response = await fetch(url);
      const data = await response.json();
      setCalendarData(data);
    } catch (error) {
      setError(true);
      console.error('Error fetching calendar data:', error);
    }
  };

  useEffect(() => {
    if (startDateSpan) {
      if (endDateSpan !== undefined && endDateSpan !== '' && isSingleDate && endDateSpan != null) {
        // Date range case (both start and end dates are valid)
        setSearchDate([startDateSpan, endDateSpan]);
        sessionStorage.setItem(
          indexedSessionStorageVariableNames.WidgetSearchDate,
          JSON.stringify([startDateSpan, endDateSpan]),
        );
      } else {
        // Single date case
        setSearchDate(startDateSpan);
        sessionStorage.setItem(indexedSessionStorageVariableNames.WidgetSearchDate, startDateSpan);
      }
    } else {
      // If no valid start date, clear searchDate
      setSearchDate('');
      sessionStorage.removeItem(indexedSessionStorageVariableNames.WidgetSearchDate);
    }
  }, []);

  useEffect(() => {
    if (widgetProps?.filterOptions) {
      const filterOptionsArray = widgetProps.filterOptions.split('|')?.length > 1;
      filterOptionsArray && setDisplayFiltersFlag(true);
    }
  }, [widgetProps?.filterOptions]);

  useEffect(() => {
    calendarModalToggle && setCalendarModalToggle(false);
  }, [startDateSpan, endDateSpan]);

  useEffect(() => {
    i18n.changeLanguage(widgetProps?.locale);
  }, [i18n, widgetProps?.locale]);

  useEffect(() => {
    if (widgetProps?.calendar) {
      fetchCalendarData(widgetProps.calendar);
    }
  }, [widgetProps.calendar]);

  return (
    <WidgetContext.Provider
      value={{
        widgetProps,
        pageNumber,
        data,
        totalCount,
        lastPageFlag,
        error,
        setError,
        searchKeyWord,
        displayFiltersFlag,
        searchDate,
        startDateSpan,
        endDateSpan,
        isSingleDate,
        isLoading,
        calendarModalToggle,
        indexedSessionStorageVariableNames,
        calendarData,
        selectedFilters,
        eventIdSearchParam,
        setSelectedFilters,
        getData,
        setSearchKeyWord,
        setSearchDate,
        setStartDateSpan,
        setEndDateSpan,
        setIsSingleDate,
        setCalendarModalToggle,
        resetFilters,
      }}
    >
      {children}
    </WidgetContext.Provider>
  );
};

export default WidgetContext;
