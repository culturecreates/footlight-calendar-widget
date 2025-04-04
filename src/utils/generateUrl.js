import { trackListEvents } from './googleAnalytics';

export const generateUrl = (urlComponents) => {
  let limitFormatted = urlComponents?.limit || 10;

  const pageNumber = !urlComponents?.isDeeplinkInitiatedCall ? urlComponents?.pageNumber : 1;

  if (urlComponents?.isDeeplinkInitiatedCall && typeof pageNumber === 'number') {
    limitFormatted = limitFormatted * urlComponents?.pageNumber;
  }

  const baseUrl = process.env.REACT_APP_API_URL + 'calendars/';
  const calendar = urlComponents.calendar;
  const searchEntityType = urlComponents?.searchEntityType;
  const limit = limitFormatted;
  const query = urlComponents?.searchKeyWord || '';
  const startDateSpan = urlComponents?.startDateSpan || '';
  const endDateSpan = urlComponents?.endDateSpan || '';
  const filters = decodeURIComponent(urlComponents?.searchEventsFilters || '');
  const type = urlComponents?.eventType;
  const audience = urlComponents?.audience;
  const place = urlComponents?.place;
  const disableGrouping = urlComponents?.disableGrouping;

  const dynamicFilters = urlComponents?.dynamicFilters || {}; // used to search for related events in detail page

  const queryParams = new URLSearchParams({
    page: pageNumber,
    limit,
    query,
    'start-date-range': startDateSpan,
    'end-date-range': startDateSpan && startDateSpan != '' ? endDateSpan : '',
    'disable-grouping': disableGrouping,
  });

  Object.entries(dynamicFilters).forEach(([key, value]) => {
    queryParams.append(key, value);
  });

  [
    ['type', type],
    ['audience', audience],
    ['place', place],
  ].forEach(([key, values]) => {
    if (Array.isArray(values)) {
      values.forEach((value) => {
        if (value) queryParams.append(key, value);
      });
    } else if (values) {
      queryParams.append(key, values);
    }
  });

  const apiUrl = new URL(`${baseUrl}${calendar}/${searchEntityType}`);
  apiUrl.search = queryParams.toString();

  if (filters && filters !== 'null' && filters !== 'undefined') {
    apiUrl.search += `&${filters}`;
  }

  trackListEvents(calendar, apiUrl.search);
  return apiUrl.toString();
};

export const generateWidgetUrl = (slug) => {
  const apiUrl = new URL(`${process.env.REACT_APP_API_URL}/calendars/${slug}/widget-config`);
  return apiUrl.toString();
};

export function objectToUrlParams(obj) {
  const params = [];

  for (const key in obj) {
    params.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
  }

  return params.join('&');
}
