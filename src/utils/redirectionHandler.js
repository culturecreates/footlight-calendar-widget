export const redirectionHandler = ({ url }) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const getRedirectionUrl = ({ id, type = 'searchEventsUrl', calendar, locale }) => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  if ('eventUrl' === type) return `${apiUrl}resource/${id}?calendar=${calendar}&locale=${locale}`;

  return `${apiUrl}calendars/${calendar}/events/redirect?locale=${locale}`;
};
