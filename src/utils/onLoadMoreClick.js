import { redirectionModes, urlTypes } from '../constants/generalConstants';
import { getRedirectionUrl, redirectionHandler } from './redirectionHandler';

export const onLoadMoreClick = ({ getData, pageNumber, redirectionMode, locale, calendar }) => {
  if (redirectionMode === redirectionModes.EXTERNAL)
    redirectionHandler({
      url: getRedirectionUrl({ id: null, type: urlTypes.SEARCH_EVENTS, locale, calendar }),
    });
  else getData(pageNumber + 1);
};
