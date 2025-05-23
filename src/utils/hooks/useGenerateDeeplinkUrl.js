import { useContext } from 'react';
import WidgetContext from '../../context/WidgetContext';
import { objectToUrlParams } from '../generateUrl';

export const generateDeeplinkUrl = ({ eventId }) => {
  const originUrl = window.location.href.split('?')[0];

  // Convert URLSearchParams to an object
  const currentParams = Object.fromEntries(new URLSearchParams(window.location.search));

  const {
    startDateSpan,
    endDateSpan,
    isDateRange,
    selectedFilters,
    searchKeyWord,
    pageNumber,
    searchDate,
    widgetProps,
  } = useContext(WidgetContext);

  // Filter out empty or undefined values
  const widgetState = filterValidState({
    startDateSpan,
    endDateSpan,
    searchDate,
    initialLimit: widgetProps?.limit,
    isDateRange,
    ...selectedFilters,
    searchKeyWord,
    pageNumber,
    eventId,
  });

  // Prefix keys and merge with existing URL parameters
  const widgetStateWithPrefix = Object.entries(widgetState).reduce((acc, [key, value]) => {
    acc[`footlight-${key}`] = value;
    return acc;
  }, {});

  const encodedSearchParams = objectToUrlParams({ ...currentParams, ...widgetStateWithPrefix });

  return `${originUrl}?${encodedSearchParams}`;
};

// Utility function to remove empty, null, or undefined values
const filterValidState = (state) =>
  Object.entries(state).reduce((acc, [key, value]) => {
    if (Array.isArray(value) ? value.length : value !== undefined && value !== null) {
      acc[key] = value;
    }
    return acc;
  }, {});
