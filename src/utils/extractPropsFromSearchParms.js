import { redirectionModes } from '../constants/generalConstants';

export function extractPropsFromSearchParams(defaultProps) {
  const searchParams = new URLSearchParams(window.location.search);

  const locale = searchParams.get('locale') || defaultProps?.locale || 'en';
  const calendar = searchParams.get('calendar') || defaultProps?.calendar;
  const calendarName = searchParams.get('calendarName') || defaultProps?.calendarName;
  const color = searchParams.get('color') || defaultProps?.color || '#047857';
  const limit = searchParams.get('limit') || defaultProps?.limit || 9;
  const calendarLogo = searchParams.get('logo') || defaultProps?.calendarLogo;
  const eventUrl = searchParams.get('eventUrl') || defaultProps?.eventUrl;
  const searchEventsUrl = searchParams.get('searchEventsUrl') || defaultProps?.searchEventsUrl;
  const searchEventsFilters =
    searchParams.get('searchEventsFilters') || defaultProps?.searchEventsFilters;
  const height = searchParams.get('height') || defaultProps?.height || '600px';
  const index = searchParams.get('index') || defaultProps?.index || 1;
  const font = searchParams.get('font') || defaultProps?.font || 'Roboto';
  const redirectionMode =
    searchParams.get('redirectionMode') || defaultProps?.redirectionMode || redirectionModes.NONE;

  return {
    font,
    index,
    limit,
    color,
    height,
    locale,
    calendar,
    calendarName,
    searchEventsFilters,
    calendarLogo,
    redirectionMode,
    eventUrl,
    searchEventsUrl,
  };
}
