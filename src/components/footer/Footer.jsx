import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import WidgetContext from '../../context/WidgetContext';
import './footer.css';
import { getRedirectionUrl, redirectionHandler } from '../../utils/redirectionHandler';
import { redirectionModes, urlTypes } from '../../constants/generalConstants';

const Footer = () => {
  const { t } = useTranslation();
  const { widgetProps, totalCount } = useContext(WidgetContext);

  const { calendar, calendarName, locale, redirectionMode } = widgetProps;

  const submitHandler = (event) => {
    event.preventDefault();
    redirectionHandler({
      url: getRedirectionUrl({ id: null, type: urlTypes.SEARCH_EVENTS, locale, calendar }),
    });
  };

  return (
    <footer className="footer">
      {redirectionMode == redirectionModes.EXTERNAL && (
        <div className="button-container" onClick={submitHandler}>
          <button>{totalCount > 0 ? t('footer.text') : t('footer.noItems')}</button>
        </div>
      )}
      <div className="provided-by-container">
        <span className="text">{t('footer.providedBy')}</span>
        <span className="calendar-name">{calendarName}</span>
        <div className="calendar-logo">
          <img src={widgetProps?.calendarLogo} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
