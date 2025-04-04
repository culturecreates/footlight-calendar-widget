import { useState, useCallback, useEffect, useRef } from 'react';
import { generateUrl } from '../generateUrl';
import { entityTypes } from '../../constants/generalConstants';
import { transformData } from '../transformData';
import { useDebounce } from './useDebounce';

const useFetchEventData = ({
  setData,
  setError,
  setPageNumber,
  widgetProps,
  searchKeyWord,
  startDateSpan,
  endDateSpan,
  selectedFilters,
  isDeeplinkInitiatedCall,
  setIsDeeplinkInitiatedCall,
  pageNumberSearchParam,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [lastPageFlag, setLastPageFlag] = useState(false);
  const abortControllerRef = useRef(null);

  const filterUndefinedArray = (arr) => arr?.filter((value) => value !== undefined) ?? [];

  const fetchData = useCallback(
    async (page, fullDataResetFlag, limit) => {
      try {
        // Abort any ongoing request before making a new one
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();
        const { signal } = abortControllerRef.current;
        if (fullDataResetFlag) setData(() => []);

        const url = generateUrl({
          ...widgetProps,
          searchEntityType: entityTypes.EVENTS,
          searchKeyWord,
          startDateSpan,
          isDeeplinkInitiatedCall,
          limit: limit || widgetProps?.limit,
          endDateSpan,
          pageNumber: page,
          ...(selectedFilters?.EventType && {
            eventType: filterUndefinedArray(selectedFilters.EventType),
          }),
          ...(selectedFilters?.Audience && {
            audience: filterUndefinedArray(selectedFilters.Audience),
          }),
          ...(selectedFilters?.place && { place: filterUndefinedArray(selectedFilters.place) }),
        });

        const response = await fetch(url, { signal });
        if (!response.ok) {
          setError(true);
        }
        const { data, meta } = await response.json();

        setData((prevData) => [
          ...(fullDataResetFlag ? [] : prevData),
          ...transformData({ data, locale: widgetProps?.locale || 'en' }),
        ]);

        setTotalCount(meta?.totalCount);
        if (isDeeplinkInitiatedCall) {
          const pageCount = Math.ceil(meta?.totalCount / widgetProps?.limit);
          setIsDeeplinkInitiatedCall(false);
          setPageNumber(pageNumberSearchParam);
          setLastPageFlag(meta?.currentPage < pageCount);
        } else {
          setLastPageFlag(meta?.currentPage < meta?.pageCount);
          setPageNumber(meta?.currentPage);
        }
        setIsLoading(false);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(true);
          console.error('Error fetching data:', error);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [
      widgetProps,
      searchKeyWord,
      isDeeplinkInitiatedCall,
      startDateSpan,
      endDateSpan,
      selectedFilters,
    ],
  );

  const getDataDebounced = useDebounce(fetchData, 500);

  // Call API when dependencies change
  useEffect(() => {
    if (isDeeplinkInitiatedCall) return;

    setIsLoading(true);
    setData([]);
    getDataDebounced(1, true);
  }, [widgetProps, searchKeyWord, startDateSpan, endDateSpan, selectedFilters]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    isLoading,
    totalCount,
    lastPageFlag,
    getData: fetchData,
  };
};

export default useFetchEventData;
