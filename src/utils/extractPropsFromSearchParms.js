import { redirectionModes } from '../constants/generalConstants';
import { requiredParams } from '../constants/props';
import { searchDateFormatter } from './dateRangeFormatter';

export function extractPropsFromSearchParams(dataAttributes) {
  const searchParams = new URLSearchParams(window.location.search);

  const getParam = (key, defaultValue) =>
    dataAttributes?.[key] ?? searchParams.get(key) ?? defaultValue;

  const extractedProps = {
    locale: getParam('locale'),
    calendar: getParam('calendar'),
    color: getParam('color'),
    limit: getParam('limit'),
    font: getParam('font'),
    redirectionMode: getParam('redirectionMode', redirectionModes.EXTERNAL),
    height: getParam('height'),
    filterOptions: getParam('filterOptions'),
    headerTitle: getParam('headerTitle'),
    index: getParam('index'),
    searchEventsFilters: getParam('searchEventsFilters'),
    footerText: getParam('footerText'),
  };

  // ------------ Boolean values --------------- //
  Object.assign(
    extractedProps,
    ['showFooter', 'alwaysOnDatePicker', 'disableGrouping', 'showFooterLogo'].reduce((acc, key) => {
      const value = getParam(key);
      acc[key] = value ? JSON.parse(value) : null;
      return acc;
    }, {}),
  );

  // Find missing required parameters
  const missingParams = requiredParams.filter((key) => extractedProps[key] == null);
  const isSuccess = missingParams.length === 0;

  return {
    extractedProps,
    isSuccess,
    missingParams,
  };
}

export function handleInternalStateSearchParam() {
  const searchParams = new URLSearchParams(window.location.search);

  // Define parameter keys
  const paramKeys = [
    'footlight-startDateSpan',
    'footlight-endDateSpan',
    'footlight-isDateRange',
    'footlight-place',
    'footlight-Audience',
    'footlight-EventType',
    'footlight-searchKeyWord',
    'footlight-initialLimit',
    'footlight-pageNumber',
    'footlight-eventId',
    'footlight-searchDate',
  ];

  // Extract parameters
  const internalStateSearchParam = {
    startDateSpan: searchParams.get('footlight-startDateSpan'),
    endDateSpan: searchParams.get('footlight-endDateSpan'),
    initialLimit: parseInt(searchParams.get('footlight-initialLimit'), 10),
    isDateRange: searchParams.get('footlight-isDateRange') === 'true',
    selectedFilters: {
      place: searchParams.get('footlight-place')?.split(',') || [],
      Audience: searchParams.get('footlight-Audience')?.split(',') || [],
      EventType: searchParams.get('footlight-EventType')?.split(',') || [],
    },
    searchKeyWord: searchParams.get('footlight-searchKeyWord'),
    pageNumber: parseInt(searchParams.get('footlight-pageNumber'), 10),
    eventId: searchParams.get('footlight-eventId'),
    searchDate: searchDateFormatter(searchParams.get('footlight-searchDate')),
  };

  // Remove parameters
  paramKeys.forEach((key) => searchParams.delete(key));

  // Update the URL without reloading the page
  const newUrl = `${window.location.pathname}${
    searchParams.toString() ? `?${searchParams.toString()}` : ''
  }`;
  window.history.replaceState(null, '', newUrl);

  return { internalStateSearchParam, curruptInternalStateFlag: false };
}
