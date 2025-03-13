/* eslint-disable no-undef */
export const generateUrl = (urlComponents) => {
  const baseUrl = process.env.REACT_APP_API_URL + 'calendars/';
  const calendar = urlComponents.calendar;
  const searchEntityType = urlComponents?.searchEntityType;
  const limit = urlComponents?.limit || 10;
  const query = urlComponents?.searchKeyWord;
  const startDateSpan = urlComponents?.startDateSpan;
  const endDateSpan = urlComponents?.endDateSpan;
  const filters = decodeURIComponent(urlComponents?.searchEventsFilters);

  const queryParams = new URLSearchParams({
    limit,
    'end-date-range': endDateSpan,
    'start-date-range': startDateSpan,
    query,
    page: 1,
  });

  const apiUrl = new URL(`${baseUrl}${calendar}/${searchEntityType}`);
  apiUrl.search = queryParams.toString();
  if (filters && filters !== 'null' && filters !== 'undefined') {
    apiUrl.search += `&${filters}`;
  }
  return apiUrl.toString();
};
