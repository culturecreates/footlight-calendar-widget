import { createContext, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { entityTypes } from '../constants/generalConstants';
import { getDefaultSessionStorageVariableNames } from '../constants/sessionStorageVariableNames';
import { generateUrl, generateWidgetUrl } from '../utils/generateUrl';
import { transformData } from '../utils/transformData';
import { useDebounce } from '../utils/useDebounce';
import { searchDateFormatter } from '../utils/dateRangeFormatter';

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

  const [data, setData] = useState([]);
  const [lastPageFlag, setLastPageFlag] = useState(false);
  const [pageNumber, setPageNumber] = useState(pageNumberSearchParam ?? 1);
  const [displayFiltersFlag, setDisplayFiltersFlag] = useState(false);
  const [totalCount, setTotalCount] = useState();
  const [error, setError] = useState(false);
  const [searchKeyWord, setSearchKeyWord] = useState(
    searchKeyWordSearchParam || getSessionValue('WidgetSearchKeyWord'),
  );
  const [searchDate, setSearchDate] = useState(
    searchDateFormatter(getSessionValue('WidgetSearchDate')),
  );
  const [startDateSpan, setStartDateSpan] = useState(
    startDateSpanSearchParam ?? getSessionValue('WidgetStartDate'),
  );
  const [endDateSpan, setEndDateSpan] = useState(
    endDateSpanSearchParam ?? getSessionValue('WidgetEndDate'),
  );

  const [isSingleDate, setIsSingleDate] = useState(isSingleDateSearchParam || false);
  const [calendarModalToggle, setCalendarModalToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [calendarData, setCalendarData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState(selectedFiltersSearchParam ?? {});

  const { i18n } = useTranslation();

  const filterUndefinedArray = (arr) => arr?.filter((value) => value !== undefined) ?? [];

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

  const getData = useCallback(
    async (pageNumber) => {
      try {
        const url = generateUrl({
          ...widgetProps,
          searchEntityType: entityTypes.EVENTS,
          searchKeyWord,
          startDateSpan,
          endDateSpan,
          pageNumber,
          ...(selectedFilters?.EventType && {
            eventType: filterUndefinedArray(selectedFilters.EventType),
          }),
          ...(selectedFilters?.Audience && {
            audience: filterUndefinedArray(selectedFilters.Audience),
          }),
          ...(selectedFilters?.place && { place: filterUndefinedArray(selectedFilters.place) }),
        });

        setIsLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          setError(true);
        }
        const { data, meta } = await response.json();

        setData((prevData) => [
          ...prevData,
          ...transformData({ data, locale: widgetProps?.locale || 'en' }),
        ]);
        setTotalCount(meta?.totalCount);
        setLastPageFlag(meta?.currentPage < meta?.pageCount);
        setPageNumber(meta?.currentPage);
        setIsLoading(false);
      } catch (error) {
        setError(true);
        console.error('Error fetching data:', error);
      }
    },
    [widgetProps, searchKeyWord, startDateSpan, endDateSpan, selectedFilters],
  );

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

  const getDataDebounced = useDebounce(getData, 500);

  useEffect(() => {
    setData([]);
    if (!error) getDataDebounced();
  }, [widgetProps, searchKeyWord, startDateSpan, endDateSpan, selectedFilters]);

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
