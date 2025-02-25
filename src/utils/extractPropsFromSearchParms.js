import { redirectionModes } from '../constants/generalConstants';

export function extractPropsFromSearchParams(dataAttributes) {
  const searchParams = new URLSearchParams(window.location.search);

  const calendarName = dataAttributes?.calendarName || searchParams.get('calendarName');
  const calendarLogo = dataAttributes?.calendarLogo || searchParams.get('logo');
  const locale = dataAttributes?.locale || searchParams.get('locale');
  const calendar = dataAttributes?.calendar || searchParams.get('calendar');
  const color = dataAttributes?.color || searchParams.get('color');
  const limit = dataAttributes?.limit || searchParams.get('limit');
  const font = dataAttributes?.font || searchParams.get('font');
  const redirectionMode =
    dataAttributes?.redirectionMode ||
    searchParams.get('redirectionMode') ||
    redirectionModes.EXTERNAL;
  const height = dataAttributes?.height || searchParams.get('height');
  const filterOptions = dataAttributes?.filterOptions || searchParams.get('filterOptions');

  // ------------ Boolean values --------------- //
  const showFooter = JSON.parse(dataAttributes?.showFooter || searchParams.get('showFooter'));
  const alwaysOnDatePicker = JSON.parse(
    dataAttributes?.alwaysOnDatePicker || searchParams.get('alwaysOnDatePicker'),
  );
  const disableGrouping = JSON.parse(
    dataAttributes?.disableGrouping || searchParams.get('disableGrouping'),
  );

  // Optional parameters
  const headerTitle = dataAttributes?.headerTitle || searchParams.get('headerTitle');
  const index = dataAttributes?.index || searchParams.get('index');
  const searchEventsFilters =
    dataAttributes?.searchEventsFilters || searchParams.get('searchEventsFilters');

  // Required parameters
  const requiredParams = {
    locale,
    calendar,
    color,
    limit,
    font,
    redirectionMode,
    showFooter,
    // alwaysOnDatePicker,
    disableGrouping,
    filterOptions,
  };

  // Find missing required parameters
  const missingParams = Object.keys(requiredParams).filter((key) => requiredParams[key] == null);

  const isSuccess = missingParams.length === 0;

  return {
    extractedProps: {
      font,
      index,
      calendarLogo,
      limit,
      color,
      height,
      locale,
      calendarName,
      calendar,
      searchEventsFilters,
      redirectionMode,
      headerTitle,
      showFooter,
      alwaysOnDatePicker,
      disableGrouping,
      filterOptions,
    },
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
      places: searchParams.get('footlight-place')?.split(',') || [],
      audience: searchParams.get('footlight-Audience')?.split(',') || [],
      eventTypes: searchParams.get('footlight-EventType')?.split(',') || [],
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
