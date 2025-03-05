import { redirectionModes } from '../constants/generalConstants';
import { requiredParams } from '../constants/props';

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
  };

  // ------------ Boolean values --------------- //
  Object.assign(
    extractedProps,
    ['showFooter', 'alwaysOnDatePicker', 'disableGrouping'].reduce((acc, key) => {
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
    'footlight-isSingleDate',
    'footlight-place',
    'footlight-Audience',
    'footlight-EventType',
    'footlight-searchKeyWord',
    'footlight-pageNumber',
    'footlight-eventId',
  ];

  // Extract parameters
  const internalStateSearchParam = {
    startDateSpan: searchParams.get('footlight-startDateSpan'),
    endDateSpan: searchParams.get('footlight-endDateSpan'),
    isSingleDate: searchParams.get('footlight-isSingleDate') === 'true',
    selectedFilters: {
      place: searchParams.get('footlight-place')?.split(',') || [],
      Audience: searchParams.get('footlight-Audience')?.split(',') || [],
      EventType: searchParams.get('footlight-EventType')?.split(',') || [],
    },
    searchKeyWord: searchParams.get('footlight-searchKeyWord'),
    pageNumber: parseInt(searchParams.get('footlight-pageNumber'), 10) || 1,
    eventId: searchParams.get('footlight-eventId'),
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
