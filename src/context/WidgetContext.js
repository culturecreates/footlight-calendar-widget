import { createContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getDefaultSessionStorageVariableNames } from '../constants/sessionStorageVariableNames';
import { searchDateFormatter } from '../utils/dateRangeFormatter';
import useFetchEventData from '../utils/hooks/useFetchListingData';
import { generateWidgetUrl } from '../utils/generateUrl';
import { trackListEvents } from '../utils/googleAnalytics';

const WidgetContext = createContext(undefined);

export const WidgetContextProvider = ({ widgetProps, children }) => {
  const indexedSessionStorageVariableNames = getDefaultSessionStorageVariableNames(
    widgetProps?.index || 1,
  );

  const {
    startDateSpan: startDateSpanSearchParam,
    endDateSpan: endDateSpanSearchParam,
    searchDate: searchDateSearchParam,
    isDateRange: isDateRangeSearchParam,
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
  const [isDateRange, setIsDateRange] = useState(isDateRangeSearchParam || false);
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
  const [relatedEventsData, setRelatedEventsData] = useState({
    performerRelatedEvents: { ids: null, data: [] },
  });
  const [displayFiltersFlag, setDisplayFiltersFlag] = useState(false);
  const [error, setError] = useState(false);
  const [calendarModalToggle, setCalendarModalToggle] = useState(false);
  const [calendarData, setCalendarData] = useState([]);

  const [searchDate, setSearchDate] = useState(
    searchDateSearchParam || searchDateFormatter(getSessionValue('WidgetSearchDate')),
  );

  const { i18n } = useTranslation();

  const resetFilters = () => {
    setSelectedFilters({});
    setSearchKeyWord('');
    setSearchDate('');
    setStartDateSpan('');
    setEndDateSpan('');
    setIsDateRange();
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
      trackListEvents(calendar, ' ');
      const response = await fetch(url);
      const data = await response.json();
      setCalendarData(data);
    } catch (error) {
      setError(true);
      console.error('Error fetching calendar data:', error);
    }
  };

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
        relatedEventsData,
        setRelatedEventsData,
        searchDate,
        startDateSpan,
        endDateSpan,
        isDateRange,
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
        setIsDateRange,
        setCalendarModalToggle,
        resetFilters,
      }}
    >
      {children}
    </WidgetContext.Provider>
  );
};

export default WidgetContext;
