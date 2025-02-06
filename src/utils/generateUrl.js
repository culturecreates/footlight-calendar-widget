export const generateUrl = (urlComponents) => {
  const baseUrl = process.env.REACT_APP_API_URL + 'calendars/';
  const calendar = urlComponents.calendar;
  const searchEntityType = urlComponents?.searchEntityType;
  const limit = urlComponents?.limit || 10;
  const query = urlComponents?.searchKeyWord;
  const startDateSpan = urlComponents?.startDateSpan;
  const endDateSpan = urlComponents?.endDateSpan;
  const filters = decodeURIComponent(urlComponents?.searchEventsFilters);
  const pageNumber = urlComponents?.pageNumber;
  const type = urlComponents?.eventType;
  const audience = urlComponents?.audience;
  const place = urlComponents?.place;

  const queryParams = new URLSearchParams({
    page: pageNumber ?? 1,
    limit,
    query,
    'start-date-range': startDateSpan,
    'end-date-range': endDateSpan,
  });
  [
    ['type', type],
    ['audience', audience],
    ['place', place],
  ].forEach(([key, values]) => {
    values?.forEach((value) => value && queryParams.append(key, value));
  });
  const apiUrl = new URL(`${baseUrl}${calendar}/${searchEntityType}`);
  apiUrl.search = queryParams.toString();
  apiUrl.search += filters;
  return apiUrl.toString();
};

export const generateWidgetUrl = (slug) => {
  const apiUrl = new URL(`${process.env.REACT_APP_API_URL}/calendars/${slug}/widget-config`);
  return apiUrl.toString();
};
