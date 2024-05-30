import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import WidgetContext from '../../context/WidgetContext';
import './footer.css';
import { redirectionHandler } from '../../utils/redirectionHandler';

const Footer = () => {
  const { t } = useTranslation();
  const { widgetProps, totalCount } = useContext(WidgetContext);

  const { calendar, calendarName, locale } = widgetProps;
  let redirectionUrl = `${process.env.REACT_APP_API_URL}calendars/${calendar}/events/redirect?locale=${locale}`;

  const submitHandler = (event) => {
    event.preventDefault();
    redirectionHandler({ url: redirectionUrl });
  };

  return (
    <footer className="footer">
      <div className="button-container" onClick={submitHandler}>
        <button>{totalCount > 0 ? t('footer.text') : t('footer.noItems')}</button>
      </div>
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
