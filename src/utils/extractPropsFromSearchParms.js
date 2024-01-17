export function extractPropsFromSearchParams(defaultProps) {
  const searchParams = new URLSearchParams(window.location.search);

  const api = searchParams.get('api') || defaultProps.api;
  const locale = searchParams.get('locale') || defaultProps.locale;
  const calendar = searchParams.get('calendar') || defaultProps.calendar;
  const color = searchParams.get('color') || defaultProps.color;
  const limit = searchParams.get('limit') || defaultProps.limit;
  const calendarLogo = searchParams.get('logo') || defaultProps.calendarLogo;

  return {
    api,
    locale,
    calendar,
    color,
    limit,
    calendarLogo,
  };
}
