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

  // Optional parameters
  const index = dataAttributes?.index || searchParams.get('index');
  const searchEventsFilters =
    dataAttributes?.searchEventsFilters || searchParams.get('searchEventsFilters');

  // Required parameters
  const requiredParams = { locale, calendar, color, limit, font, redirectionMode };

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
    },
    isSuccess,
    missingParams,
  };
}
