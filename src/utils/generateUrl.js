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

  const queryParams = new URLSearchParams({
    page: pageNumber ?? 1,
    limit,
    query,
    'start-date-range': startDateSpan,
    'end-date-range': endDateSpan,
  });

  const apiUrl = new URL(`${baseUrl}${calendar}/${searchEntityType}`);
  apiUrl.search = queryParams.toString();
  apiUrl.search += filters;
  return apiUrl.toString();
};
