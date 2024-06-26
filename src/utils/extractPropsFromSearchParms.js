export function extractPropsFromSearchParams(defaultProps) {
  const searchParams = new URLSearchParams(window.location.search);

  const api = searchParams.get('api') || defaultProps?.api;
  const locale = searchParams.get('locale') || defaultProps?.locale;
  const calendar = searchParams.get('calendar') || defaultProps?.calendar;
  const calendarName = searchParams.get('calendarName') || defaultProps?.calendarName;
  const color = searchParams.get('color') || defaultProps?.color;
  const limit = searchParams.get('limit') || defaultProps?.limit;
  const calendarLogo = searchParams.get('logo') || defaultProps?.calendarLogo;
  const eventUrl = searchParams.get('eventUrl') || defaultProps?.eventUrl;
  const searchEventsUrl = searchParams.get('searchEventsUrl') || defaultProps?.searchEventsUrl;
  const searchEventsFilters =
    searchParams.get('searchEventsFilters') || defaultProps?.searchEventsFilters;
  const height = searchParams.get('height') || defaultProps?.height;
  const index = searchParams.get('index') || defaultProps?.index;
  const font = searchParams.get('font') || defaultProps?.font;

  return {
    api,
    font,
    index,
    limit,
    color,
    height,
    locale,
    calendar,
    calendarName,
    searchEventsFilters,
    calendarLogo: calendarLogo,
    eventUrl: eventUrl,
    searchEventsUrl: searchEventsUrl,
  };
}
