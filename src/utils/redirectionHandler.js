export const redirectionHandler = ({ url }) => {
  window.open(url, '_blank');
};

export const getRedirectionUrl = ({ id, type = 'searchEventsUrl', calendar, locale }) => {
  if ('eventUrl' === type)
    return `${process.env.REACT_APP_API_URL}${type}/${id}?calendar=${calendar}&locale=${locale}`;

  return `${process.env.REACT_APP_API_URL}calendars/${calendar}/events/redirect?locale=${locale}`;
};
